<script setup lang="ts">
import type {
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CaretSortIcon, ChevronDownIcon } from "@radix-icons/vue";
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { h, ref } from "vue";
import { FetchedOrderType } from "@/lib/types";
import { useOrders } from "@/stores/useOrders";
import { valueUpdater } from "@/lib/utils";
import { useAuth } from "@/stores/useAuth";
import { onBeforeMount } from "vue";

const ordersStore = useOrders();
const authStore = useAuth();

const columnHelper = createColumnHelper<FetchedOrderType>();

const columns = [
  columnHelper.accessor("status", {
    header: ({}) => {
      return h(h("div", { class: "capitalize" }, "Status"));
    },

    cell: ({ row }) =>
      h("div", { class: "capitalize" }, row.getValue("status")),
  }),

  columnHelper.accessor("email", {
    header: () => {
      return h(
        h(
          "div",
          { class: `${!authStore.isAdmin && "hidden"} capitalize` },
          "Email"
        )
      );
    },
    cell: ({ row }) =>
      h(
        "div",
        { class: `${!authStore.isAdmin && "hidden"}` },
        row.getValue("email")
      ),
  }),

  columnHelper.accessor("date", {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Date", h(CaretSortIcon, { class: "ml-2 h-4 w-4" })]
      );
    },

    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        new Date(Date.parse(row.getValue("date"))).toLocaleDateString(
          ["en-US"],
          {
            formatMatcher: "basic",
          }
        )
      ),
  }),

  columnHelper.accessor("order", {
    header: () => {
      return h(h("div", { class: "capitalize" }, "Order"));
    },
    cell: ({ row }) => h("div", row.original.message.join(", ")),
  }),

  columnHelper.accessor("summary", {
    header: () => {
      return h(
        "div",
        {
          class: "text-left",
          variant: "ghost",
        },
        "Amount"
      );
    },

    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("summary"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return h("div", { class: "font-medium" }, formatted);
    },
  }),
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
  data: ordersStore.orders,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),

  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get expanded() {
      return expanded.value;
    },
  },
});

onBeforeMount(() => {
  setTimeout(() =>
    authStore.isAdmin
      ? ordersStore.fetchAdminOrders()
      : ordersStore.fetchOrders()
  );
});
</script>

<template>
  <div class="w-full">
    <div class="flex gap-2 items-center py-4">
      <Input
        v-if="authStore.isAdmin"
        class="max-w-sm"
        placeholder="Filter email..."
        :model-value="table.getColumn('email')?.getFilterValue() as string"
        @update:model-value="table.getColumn('email')?.setFilterValue($event)"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronDownIcon class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table
              .getAllColumns()
              .filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="
              (value) => {
                column.toggleVisibility(!!value);
              }
            "
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :orders-pinned="header.column.getIsPinned()"
              :class="
                cn(
                  { 'sticky bg-background/95': header.column.getIsPinned() },
                  header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0'
                )
              "
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :orders-state="row.getIsSelected() && 'selected'">
                <TableCell
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  :orders-pinned="cell.column.getIsPinned()"
                  :class="
                    cn(
                      { 'sticky bg-background/95': cell.column.getIsPinned() },
                      cell.column.getIsPinned() === 'left'
                        ? 'left-0'
                        : 'right-0'
                    )
                  "
                >
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>
