import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutoSizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
        // We need to reset the height momentarily to get the correct scrollHeight for the textarea
        textAreaRef.style.height = "250px";
        textAreaRef.style.width="400px"
        const scrollHeight = textAreaRef.scrollHeight;
        const scrollWidth=textAreaRef.scrollWidth;
        // We then set the height directly, outside of the render loop
        // Trying to set this with state or a ref will product an incorrect value.
        textAreaRef.style.height = scrollHeight + "px";
      textAreaRef.style.width=scrollWidth+"px";
    }
  }, [textAreaRef, value]);
};

export default useAutoSizeTextArea;
