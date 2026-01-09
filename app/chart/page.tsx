import Chart1Loader from "@/components/features/chart/container/Chart1Loader";
import Chart2Loader from "@/components/features/chart/container/Chart2Loader";
import Chart3Loader from "@/components/features/chart/container/Chart3Loader";
import Chart4Loader from "@/components/features/chart/container/Chart4Loader";
import Chart5Loader from "@/components/features/chart/container/Chart5Loader";
import Chart6Loader from "@/components/features/chart/container/Chart6Loader";
import Chart7Loader from "@/components/features/chart/container/Chart7Loader";
import Chart8Loader from "@/components/features/chart/container/Chart8Loader";
import Chart9Loader from "@/components/features/chart/container/Chart9Loader";
import Chart10Loader from "@/components/features/chart/container/Chart10Loader";

const Page = () => {
  return (
    <div className="p-4 grid grid-cols-2 gap-[10px]">
      <Chart1Loader />
      <Chart2Loader />
      <Chart3Loader />
      <Chart4Loader />
      <Chart5Loader />
      <Chart6Loader />
      <Chart7Loader />
      <Chart8Loader />
      <div className="col-span-2">
        <Chart9Loader />
      </div>
      <div className="col-span-2">
        <Chart10Loader />
      </div>
    </div>
  );
};

export default Page;
