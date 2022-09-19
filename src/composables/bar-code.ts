import JsBarcode from "jsbarcode";
import type { Options } from "jsbarcode";
import { type Ref, watch, ref } from "vue";
import { resolveRef, type MaybeComputedRef } from "@vueuse/shared";

export const useBarCode = (
  text: MaybeComputedRef<string>,
  options?: Options
): Ref<string> => {
  const src = resolveRef(text);
  const result = ref("");
  const canvas = document.createElement("canvas");

 
  watch(
    src,
     (value) => {
      if (src.value) JsBarcode(canvas, value, options);
      canvas.toBlob((blob) => {
        if (blob) result.value = URL.createObjectURL(blob);
      });
    },
    { immediate: true }
  );
  return result
};
