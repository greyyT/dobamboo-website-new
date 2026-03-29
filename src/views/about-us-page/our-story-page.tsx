'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import Screen from '@/components/screen';
import { AboutUsSearchParams, AboutUsTabKey } from '@/constants/query-params';
import { cn } from '@/lib/utils';

const CONTENT = {
  vi: {
    title: 'THE TRE VITA STORY',
    paragraphs: [
      'Tre Vita bắt đầu từ một câu hỏi rất giản dị, nhưng day dứt: vì sao một nghề đã tồn tại hàng trăm năm, có tay nghề cao và giá trị thẩm mỹ rõ ràng như mây tre đan, lại thường chỉ dừng ở quy mô nhỏ lẻ, thiếu sự ổn định và khó đi xa trong đời sống hiện đại?',
      'Chúng tôi lớn lên trong môi trường mà mây tre đan không phải là một "sản phẩm", mà là một phần của đời sống thường ngày. Nghề không được học qua sách vở hay trường lớp, mà hình thành từ việc quan sát cha ông làm nghề, từ những lần cầm tre, vót mây, làm đi làm lại một động tác cho đến khi đôi tay tự ghi nhớ. Qua thời gian, người thợ không chỉ làm quen với kỹ thuật, mà còn hiểu vật liệu, hiểu lực tay và hiểu giới hạn của chính mình.',
      'Chính từ nền tảng đó, sự sáng tạo của nghề mây tre đan được hình thành. Đó không phải là sự sáng tạo ngẫu hứng, mà là sáng tạo dựa trên tay nghề, kinh nghiệm và sự am hiểu sâu sắc về vật liệu. Với nghề này, làm cho đúng, cho chắc và cho bền không đối lập với sáng tạo. Ngược lại, đó là điều kiện để sáng tạo có thể đứng vững, được lặp lại và phát triển theo thời gian, thay vì chỉ tồn tại như những thử nghiệm rời rạc.',
      'Tuy nhiên, khi bước ra khỏi phạm vi làng nghề và tiếp cận thị trường rộng hơn, chúng tôi nhận thấy một khoảng trống rất rõ ràng. Nghề có, tay nghề có, nhưng cách tổ chức còn thiếu nhất quán. Nhiều sản phẩm đẹp, nhưng khó lặp lại. Nhiều ý tưởng hay, nhưng không có nền tảng để phát triển thành dòng sản phẩm ổn định. Chính sự thiếu hụt này khiến nghề mây tre đan gặp khó khăn khi làm việc lâu dài với thị trường, đặc biệt là trong bối cảnh sản xuất và xuất khẩu.',
      'Tre Vita ra đời từ chính khoảng trống đó.',
      'Chúng tôi không mong muốn thay đổi bản chất của nghề, cũng không tìm cách "hiện đại hóa" bằng những can thiệp vội vàng. Điều Tre Vita lựa chọn là giữ lại cốt lõi của thủ công – đôi tay người thợ, vật liệu tự nhiên và kinh nghiệm truyền đời – nhưng đặt chúng trong một cách làm rõ ràng và có định hướng hơn.',
      'Ở giai đoạn đầu, Tre Vita tập trung tiêu chuẩn hóa những gì đã có: cấu trúc sản phẩm, tỷ lệ, cách hoàn thiện và chất lượng đầu ra. Đây là bước cần thiết để sản phẩm có thể được sản xuất ổn định, sử dụng lâu dài và làm việc được với thị trường một cách nghiêm túc. Tiêu chuẩn, trong trường hợp này, không nhằm giới hạn nghề, mà để tạo ra một mặt bằng chung đủ vững cho sự phát triển tiếp theo.',
      'Khi nền tảng này đủ chắc, Tre Vita không dừng lại ở việc lặp lại những thiết kế quen thuộc. Mục tiêu dài hạn của chúng tôi là từng bước tiêu chuẩn hóa chính quá trình sáng tạo. Những ý tưởng mới không chỉ dừng ở cảm hứng cá nhân, mà được thử nghiệm, hoàn thiện và phát triển thành sản phẩm một cách có hệ thống. Sáng tạo, khi đó, không bị bó hẹp, mà được nuôi dưỡng để có thể đi xa và tồn tại lâu dài trong thực tế sản xuất.',
      'Tre Vita không được xây dựng như một xưởng gia công thuần túy, cũng không phải một thương hiệu chỉ kể câu chuyện cho đẹp. Chúng tôi xem mỗi sản phẩm là một phần trong quá trình làm nghề dài hạn: làm – rút kinh nghiệm – điều chỉnh – rồi làm tốt hơn ở lần sau. Những gì chưa làm được ở hiện tại, Tre Vita không né tránh, mà đặt vào một lộ trình phát triển phù hợp với quy mô và nguồn lực thực tế.',
      'Chúng tôi tin rằng nghề thủ công không mai một vì thiếu sáng tạo, mà vì thiếu một cách làm đủ nghiêm túc để sáng tạo có thể được tiếp nối. Tre Vita chọn đi chậm, nhưng đi chắc. Không chạy theo số lượng, không phô trương thành tựu, mà tập trung xây dựng nền tảng để nghề mây tre đan có thể tiếp tục sống, tiếp tục được sử dụng và tiếp tục được trân trọng trong đời sống hiện đại.',
      'The Tre Vita Story không phải là câu chuyện về việc tạo ra điều gì đó hoàn toàn mới, mà là hành trình tổ chức lại một nghề đã tồn tại rất lâu — để sự sáng tạo vốn có của nghề có thể được phát huy một cách bền vững, có hệ thống và đi được đường dài.',
    ],
  },
  en: {
    title: 'THE TRE VITA STORY',
    paragraphs: [
      'Tre Vita began with a simple but persistent question: why does a craft that has existed for hundreds of years—rich in skill, material knowledge, and aesthetic value like bamboo and rattan weaving—often remain small-scale, inconsistent, and difficult to sustain in modern life?',
      'We grew up in an environment where bamboo and rattan were not "products," but part of everyday living. The craft was never learned from books or classrooms. It was formed through observation—watching older generations work—through handling bamboo, splitting rattan, and repeating the same movements until the hands remembered on their own. Over time, the artisan learns not only technique, but also material behavior, hand pressure, and the limits of both the material and oneself.',
      'From this foundation, creativity naturally emerges. In bamboo and rattan craft, creativity is not spontaneous or decorative—it is grounded in skill, experience, and a deep understanding of the material. Making something "right," "strong," and "lasting" does not stand in opposition to creativity. On the contrary, it is what allows creative ideas to endure, to be repeated, and to evolve beyond isolated experiments.',
      'However, when stepping beyond the craft village and into broader markets, a clear gap becomes apparent. The skills exist, but the way of working is often fragmented. Many products are beautiful, yet difficult to reproduce consistently. Many ideas are promising, yet lack the structure needed to grow into reliable product lines. This gap is what limits traditional craft when working long-term with modern markets, especially in production and export contexts.',
      'Tre Vita was formed within this gap.',
      'We do not seek to change the nature of the craft, nor to modernize it through rushed intervention. What Tre Vita chooses is to preserve the core of craftsmanship—human hands, natural materials, and inherited knowledge—while placing it within a clearer, more deliberate way of working.',
      'In its early stage, Tre Vita focuses on standardizing what already exists: product structures, proportions, finishing levels, and quality outcomes. This step is essential for achieving consistency, long-term usability, and reliable collaboration with the market. Here, standards are not meant to restrict the craft, but to establish a stable foundation on which it can grow.',
      'As this foundation becomes solid, Tre Vita does not stop at repeating familiar designs. Our long-term goal is to gradually systematize the creative process itself—so new ideas can be developed, tested, refined, and brought into production in a structured way, rather than remaining as one-off expressions. In this context, creativity is not limited; it is supported and sustained.',
      'Tre Vita is not built as a pure manufacturing workshop, nor as a brand driven by storytelling alone. Each product is treated as part of a long-term learning process: making, reflecting, adjusting, and improving over time. What cannot yet be achieved is not ignored, but placed within a realistic development path aligned with available resources and scale.',
      'We believe traditional craft does not fade because it lacks creativity, but because creativity is not supported by a serious enough way of working. Tre Vita chooses to move slowly, but with intention. We do not pursue volume or quick recognition. Instead, we focus on building a foundation strong enough for bamboo and rattan craftsmanship to continue living—used, valued, and respected—in contemporary life.',
      'The Tre Vita Story is not about inventing something entirely new, but about reorganizing a craft that has existed for generations—so its inherent creativity can be carried forward in a sustainable, structured, and lasting way.',
    ],
  },
};

const OurStoryPage = () => {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isActive = searchParams.get(AboutUsSearchParams.Tab) === AboutUsTabKey.OurStory;
  const content = CONTENT[locale as keyof typeof CONTENT] ?? CONTENT.en;

  return (
    <div className={cn(!isActive && 'hidden')}>
      <Screen>
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">{content.title}</h1>
          </div>
          <div className="prose prose-sm sm:prose-base lg:prose-lg mx-auto max-w-none space-y-4 sm:space-y-6">
            {content.paragraphs.map((p, i) => (
              <p key={i} className="text-sm sm:text-base text-zinc-800 leading-6 sm:leading-7">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Screen>
    </div>
  );
};

export default OurStoryPage;
