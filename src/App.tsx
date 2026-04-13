import { APP_VERSION, DATA_AS_OF } from '@/utils/constants';

export function App() {
  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col items-center justify-center">
      <h1 className="text-display">Oil</h1>
      <p className="text-body">{APP_VERSION} — {DATA_AS_OF}</p>
    </div>
  );
}
