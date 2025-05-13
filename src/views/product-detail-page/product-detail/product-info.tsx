import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface IProductInfoProps {
  description: string;
  dimensions: string[];
}

const ProductInfo = ({ description, dimensions }: IProductInfoProps) => {
  return (
    <div className="mt-8">
      <Tabs defaultValue="account" className="w-full ">
        <TabsList className="bg-white p-0">
          <TabsTrigger
            className="data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none data-[state=active]:border-b-2 border-b border-slate-400 data-[state=active]:border-black transition-none transition-colors px-5 cursor-pointer"
            value="account"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none data-[state=active]:border-b-2 border-b border-slate-400 data-[state=active]:border-black transition-none transition-colors px-5 cursor-pointer"
            value="password"
          >
            Dimensions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-4">
          {description}
        </TabsContent>
        <TabsContent value="password" className="mt-4">
          <ul className="list-disc list-inside">
            {dimensions.map((dimension, idx) => (
              <li key={idx}>{dimension}</li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductInfo;
