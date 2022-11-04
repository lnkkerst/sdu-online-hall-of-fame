const dragging = ref(false);

document.addEventListener('mousedown', () => (dragging.value = false));
document.addEventListener('mousemove', () => (dragging.value = true));
// document.addEventListener('mouseup', () => (dragging.value = false));

export const useDragging = function () {
  return dragging;
};
