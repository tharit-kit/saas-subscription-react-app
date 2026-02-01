import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl">
        <div className="p-6 space-y-5">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-slate-900">
              Styled PrimeReact + Tailwind
            </h1>
            <p className="text-slate-600">
              Tailwind handles layout. PrimeReact handles component look.
            </p>
          </div>

          {/* Input group keeps icon aligned + consistent height */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>

            <span className="p-inputgroup w-full">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope" />
              </span>
              <InputText placeholder="you@example.com" className="w-full" />
            </span>
          </div>

          <Button label="Sign in" icon="pi pi-check" className="w-full" />
        </div>
      </Card>
    </div>
  );
}

export default App
