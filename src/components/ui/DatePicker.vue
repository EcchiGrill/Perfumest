<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useDatePicker } from "@/stores/useDatePicker";
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";
const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const dateStore = useDatePicker();
const props = defineProps<{ class: string }>();
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-[280px] justify-start text-left font-normal',
            !dateStore.value && 'text-muted-foreground',
            props.class
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{
          dateStore.value
            ? df.format(dateStore.value.toDate(getLocalTimeZone()))
            : "Pick a date"
        }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="dateStore.value" initial-focus />
    </PopoverContent>
  </Popover>
</template>
