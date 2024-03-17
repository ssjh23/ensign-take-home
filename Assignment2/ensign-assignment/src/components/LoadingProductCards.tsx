
export default function LoadingProductCard() {

    return (
        <div className="space-y-5 rounded-2xl bg-slate-100 p-4 animate-pulse">
        <div className="h-24 rounded-lg bg-slate-300"></div>
        <div className="space-y-3">
            <div className="h-3 w-3/5 rounded-lg bg-slate-300"></div>
            <div className="h-3 w-4/5 rounded-lg bg-slate-300"></div>
            <div className="h-3 w-2/5 rounded-lg bg-slate-300"></div>
        </div>
        </div>
    )
  }