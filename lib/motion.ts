export const hidden = { opacity: 0, y: 24 };
export const hiddenX = { opacity: 0, x: 32 };

export function visibleFadeUp(delay = 0) {
  return { opacity: 1, y: 0, transition: { duration: 0.55, delay } };
}

export function visibleX(delay = 0) {
  return { opacity: 1, x: 0, transition: { duration: 0.5, delay } };
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
