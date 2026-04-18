type AnnouncementPriority = 'polite' | 'assertive';

const liveRegions = new Map<AnnouncementPriority, HTMLDivElement>();

function getOrCreateRegion(priority: AnnouncementPriority): HTMLDivElement {
  const existing = liveRegions.get(priority);
  if (existing) return existing;

  const element = document.createElement('div');
  element.setAttribute('aria-live', priority);
  element.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
  element.setAttribute('aria-atomic', 'true');
  element.className = 'sr-only';
  document.body.appendChild(element);

  liveRegions.set(priority, element);
  return element;
}

export function announceToScreenReader(
  message: string,
  priority: AnnouncementPriority = 'polite',
): void {
  if (typeof document === 'undefined') return;

  const region = getOrCreateRegion(priority);
  region.textContent = '';
  region.textContent = message;
}

export function cleanupAnnouncements(): void {
  liveRegions.forEach((element) => {
    element.textContent = '';
    element.remove();
  });
  liveRegions.clear();
}
