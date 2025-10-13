import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface IProductInfoProps {
  description: string;
  dimensions: string[];
}

const ProductInfo = ({ description, dimensions }: IProductInfoProps) => {
  return (
    <div className="w-full">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="bg-white p-0 w-full sm:w-auto justify-start">
          <TabsTrigger
            className="data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none data-[state=active]:border-b-2 border-b border-slate-400 data-[state=active]:border-black transition-colors px-4 sm:px-5 py-3 cursor-pointer text-sm sm:text-base flex-1 sm:flex-none"
            value="description"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none data-[state=active]:border-b-2 border-b border-slate-400 data-[state=active]:border-black transition-colors px-4 sm:px-5 py-3 cursor-pointer text-sm sm:text-base flex-1 sm:flex-none"
            value="dimensions"
          >
            Dimensions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-4 sm:mt-6">
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed">{description}</div>
        </TabsContent>

        <TabsContent value="dimensions" className="mt-4 sm:mt-6">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 mb-3 sm:mb-4">Product Dimensions:</h3>
            <ul className="space-y-2">
              {dimensions.map((dimension, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{dimension}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductInfo;
