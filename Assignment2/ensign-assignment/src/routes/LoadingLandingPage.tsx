import LoadingProductCard from "../components/LoadingProductCards";


export default function LoadingLandingPage() {

  return (
    <div className="flex justify-center fixed h-full w-full pt-20 overflow-auto scroll-smooth">
      <div className="w-5/6 grid grid-cols-2 gap-4 md:grid-cols-3 ">
          <LoadingProductCard/>
          <LoadingProductCard/>
          <LoadingProductCard/>
          <LoadingProductCard/>
          <LoadingProductCard/>
          <LoadingProductCard/>
          <LoadingProductCard/>
          <LoadingProductCard/>
        </div>
    </div>
  )
}