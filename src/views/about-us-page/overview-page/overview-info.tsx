'use client';

import { useLocale } from 'next-intl';

import Screen from '@/components/screen';

import { OverviewRowSection, OverviewRowSectionContent } from './overview-components';

const CONTENT = {
  en: [
    {
      title: 'Rooted in craft villages',
      paragraphs: [
        'Tre Vita is rooted in Vietnamese bamboo and rattan craft villages, where natural materials and human hands have been connected for generations. To us, this craft is not simply a handmade occupation, but the result of skill, experience, and patience built up over time.',
        'While originating from craft villages, Tre Vita does not practice craft in a spontaneous or purely intuitive way. With years of experience in manufacturing and export-oriented production, our team approaches the craft with a practical mindset: products must be usable, consistent, and able to grow sustainably. Tre Vita was created to preserve the value of traditional craft through a more deliberate and contemporary way of working.',
      ],
    },
    {
      title: 'How we practice craft at The Trevita',
      paragraphs: [
        'Tre Vita continues to practice bamboo and rattan craft by hand. Each product is made directly by artisans, preserving the marks of craftsmanship and the natural character of the material. This remains the core of what we value and protect.',
        'The difference lies in how the work is organized. We do not rely on impulse or improvisation. Every product begins with defined designs, proportions, and structures. During production, finishing levels are guided by clear criteria so that products can be reproduced with minimal variation across batches.',
      ],
    },
    {
      title: 'Craft built for the long term',
      paragraphs: [
        'For Tre Vita, the value of a product goes beyond its appearance to its reliability and consistency in everyday use. Clients working with Tre Vita can expect stable quality, clear product structures, and transparent collaboration.',
        'At its current stage, Tre Vita focuses on building a solid foundation—from design and production to quality control. Improvements in materials, treatment, and sustainability are developed gradually, in line with realistic scale and resources rather than premature promises.',
        'We choose to grow slowly but with purpose. Each product is made not only to look good today, but to perform reliably over time. At Tre Vita, trust is built through daily practice, not through claims.',
      ],
    },
  ],
  vi: [
    {
      title: 'Từ nền tảng làng nghề',
      paragraphs: [
        'Tre Vita được hình thành từ nền tảng làng nghề mây tre đan Việt Nam – nơi vật liệu tự nhiên và đôi tay con người đã gắn bó với nhau qua nhiều thế hệ. Với chúng tôi, nghề mây tre đan không chỉ là một công việc thủ công, mà là kết quả của tay nghề, kinh nghiệm và sự kiên nhẫn được tích lũy qua thời gian.',
        'Tuy xuất phát từ làng nghề, Tre Vita không tiếp cận nghề theo cách tự phát hay thuần cảm hứng. Đội ngũ của chúng tôi có nhiều năm làm việc trong môi trường sản xuất và xuất khẩu, vì vậy luôn nhìn nghề bằng con mắt thực tế: sản phẩm cần dùng được, làm ổn định và có thể phát triển lâu dài. Tre Vita ra đời từ mong muốn giữ lại giá trị của nghề, nhưng bằng một cách làm nghiêm túc và phù hợp hơn với đời sống hiện đại.',
      ],
    },
    {
      title: 'Cách The Trevita làm nghề',
      paragraphs: [
        'Tre Vita vẫn làm nghề mây tre đan bằng tay. Mỗi sản phẩm đều được người thợ trực tiếp tạo tác, giữ lại dấu vết của tay nghề và đặc tính tự nhiên của vật liệu. Đây là phần cốt lõi mà Tre Vita luôn trân trọng và gìn giữ.',
        'Tre Vita vẫn làm nghề mây tre đan bằng tay. Mỗi sản phẩm đều được người thợ trực tiếp tạo tác, giữ lại dấu vết của tay nghề và đặc tính tự nhiên của vật liệu. Đây là phần cốt lõi mà Tre Vita luôn trân trọng và gìn giữ.',
      ],
    },
    {
      title: 'Làm nghề đi đường dài',
      paragraphs: [
        'Đối với Tre Vita, giá trị của sản phẩm không chỉ nằm ở hình thức bên ngoài, mà còn ở sự ổn định và đáng tin cậy trong quá trình sử dụng. Khách hàng làm việc với Tre Vita có thể kỳ vọng vào chất lượng đồng đều, cấu trúc sản phẩm rõ ràng và cách làm việc minh bạch.',
        'Ở giai đoạn hiện tại, Tre Vita tập trung xây dựng nền tảng: từ thiết kế, sản xuất đến kiểm soát chất lượng. Những cải tiến về vật liệu, xử lý và tính bền vững được thực hiện từng bước, phù hợp với quy mô và nguồn lực thực tế, thay vì đưa ra những cam kết vượt quá khả năng.',
        'Chúng tôi chọn phát triển chậm nhưng chắc. Mỗi sản phẩm làm ra không chỉ để đẹp ở thời điểm hiện tại, mà để sử dụng ổn định trong thời gian dài. Với Tre Vita, sự tin cậy không đến từ lời nói, mà được tạo ra từ cách làm nghề mỗi ngày.',
      ],
    },
  ],
};

const OverviewInfo = () => {
  const locale = useLocale();
  const blocks = CONTENT[locale as keyof typeof CONTENT] ?? CONTENT.en;
  const [block1, block2, block3] = blocks;

  return (
    <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16 pb-12">
      {/* Block 1 */}
      <div className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <Screen>
          <OverviewRowSection
            variant="normal"
            title={block1.title}
            imageUrl="https://utfs.io/f/4aj0HC2QAzunPxngL6X8K1ApS2u9UMciIN8CFolZQRG7gfWe"
          >
            {block1.paragraphs.map((paragraph, index) => (
              <OverviewRowSectionContent key={`block-1-${index}`}>{paragraph}</OverviewRowSectionContent>
            ))}
          </OverviewRowSection>
        </Screen>
      </div>

      {/* Block 2 */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Screen>
          <OverviewRowSection
            variant="normal"
            title={block2.title}
            imageUrl="https://utfs.io/f/4aj0HC2QAzunpal2gT2W7yNBEkq1rjPZe9RQ3KLhCgOsFH2c"
            isReverse
          >
            {block2.paragraphs.map((paragraph, index) => (
              <OverviewRowSectionContent key={`block-2-${index}`}>{paragraph}</OverviewRowSectionContent>
            ))}
          </OverviewRowSection>
        </Screen>
      </div>

      {/* Block 3 */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Screen>
          <OverviewRowSection
            variant="normal"
            title={block3.title}
            imageUrl="https://utfs.io/f/4aj0HC2QAzunjoeVOuirCmT9HUPQ8X3btifkc60OplYFKE2B"
          >
            {block3.paragraphs.map((paragraph, index) => (
              <OverviewRowSectionContent key={`block-3-${index}`}>{paragraph}</OverviewRowSectionContent>
            ))}
          </OverviewRowSection>
        </Screen>
      </div>
    </div>
  );
};

export default OverviewInfo;
