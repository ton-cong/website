import React from 'react';
import { ShieldCheckIcon, TruckIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 px-6 py-24 sm:py-32 lg:px-8 shadow-2xl rounded-3xl mb-16 mx-4 sm:mx-0">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-fade-in-up">Về Chúng Tôi</h2>
                    <p className="mt-6 text-lg leading-8 text-indigo-200 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Khám phá câu chuyện đằng sau sự thành công và cam kết của chúng tôi đối với khách hàng trong việc mang đến những sản phẩm công nghệ hàng đầu.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Sứ Mệnh Của LapTon</h3>
                    <p className="mt-6 text-lg leading-8 text-slate-600 text-justify">
                        LapTon được thành lập với tầm nhìn trở thành nhà bán lẻ laptop và thiết bị công nghệ hàng đầu tại Việt Nam. Chúng tôi tin rằng công nghệ là chìa khóa để mở khóa tiềm năng của mỗi cá nhân và doanh nghiệp. Sứ mệnh của chúng tôi không chỉ là bán sản phẩm, mà là cung cấp những giải pháp công nghệ tối ưu, giúp khách hàng đạt được hiệu suất cao nhất trong công việc và cuộc sống.
                    </p>
                    <p className="mt-4 text-lg leading-8 text-slate-600 text-justify">
                        Với đội ngũ chuyên gia giàu kinh nghiệm, nhiệt huyết và am hiểu sâu sắc về công nghệ, LapTon cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất, từ khâu tư vấn chọn sản phẩm đến dịch vụ hậu mãi chăm sóc khách hàng chuyên nghiệp.
                    </p>
                </div>

                {/* Features/Core Values */}
                <div className="mx-auto max-w-7xl mt-20 md:mt-32">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-lg">
                                <ShieldCheckIcon className="h-10 w-10" aria-hidden="true" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">Chất lượng đảm bảo</h4>
                            <p className="text-slate-600">100% sản phẩm chính hãng, đầy đủ giấy tờ với chính sách bảo hành uy tín từ nhà sản xuất.</p>
                        </div>
                        <div className="flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shadow-lg">
                                <CurrencyDollarIcon className="h-10 w-10" aria-hidden="true" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">Giá cả cạnh tranh</h4>
                            <p className="text-slate-600">Luôn mang đến mức giá tốt nhất thị trường cùng nhiều chương trình khuyến mãi hấp dẫn.</p>
                        </div>
                        <div className="flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-lg">
                                <TruckIcon className="h-10 w-10" aria-hidden="true" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">Giao hàng siêu tốc</h4>
                            <p className="text-slate-600">Dịch vụ giao hàng nhanh chóng, an toàn và hoàn toàn miễn phí trong khu vực nội thành.</p>
                        </div>
                        <div className="flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300 shadow-lg">
                                <UserGroupIcon className="h-10 w-10" aria-hidden="true" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">Hỗ trợ tận tâm</h4>
                            <p className="text-slate-600">Đội ngũ kỹ thuật viên chuyên nghiệp luôn sẵn sàng hỗ trợ 24/7 mọi vấn đề của bạn.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
