import React, { useState } from 'react';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock successful submission
        toast.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="bg-white">
            {/* Header / Hero */}
            <div className="relative isolate overflow-hidden bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-900 px-6 py-20 sm:py-28 lg:px-8 shadow-2xl rounded-3xl mb-16 mx-4 sm:mx-0">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Liên Hệ</h2>
                    <p className="mt-6 text-lg leading-8 text-slate-300">
                        Bạn có thắc mắc hay cần hỗ trợ? Đội ngũ của chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi yêu cầu của bạn.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div>
                        <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Thông tin liên lạc</h3>
                        <p className="text-lg text-slate-600 mb-10">
                            Chúng tôi luôn mong muốn mang đến dịch vụ tốt nhất. Vui lòng liên hệ qua các kênh dưới đây hoặc điền vào form, chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-x-6 items-center p-6 bg-slate-50 rounded-2xl hover:shadow-md transition-shadow">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg">
                                    <MapPinIcon className="h-8 w-8" aria-hidden="true" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900">Địa chỉ văn phòng</h4>
                                    <p className="mt-1 text-slate-600">Thuỷ Lợi, Đống Đa, Hà Nội, Việt Nam</p>
                                </div>
                            </div>

                            <div className="flex gap-x-6 items-center p-6 bg-slate-50 rounded-2xl hover:shadow-md transition-shadow">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg">
                                    <PhoneIcon className="h-8 w-8" aria-hidden="true" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900">Số điện thoại</h4>
                                    <p className="mt-1 text-slate-600">Hotline: 0909 123 456<br />Hỗ trợ KT: 0909 123 789</p>
                                </div>
                            </div>

                            <div className="flex gap-x-6 items-center p-6 bg-slate-50 rounded-2xl hover:shadow-md transition-shadow">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg">
                                    <EnvelopeIcon className="h-8 w-8" aria-hidden="true" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900">Email hỗ trợ</h4>
                                    <p className="mt-1 text-slate-600">support@lapton.vn<br />sales@lapton.vn</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Gửi tin nhắn cho chúng tôi</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900">Họ và Tên</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
                                        placeholder="Nhập họ tên của bạn"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">Email</label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium leading-6 text-slate-900">Chủ đề</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
                                        placeholder="Chủ đề bạn muốn hỏi"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium leading-6 text-slate-900">Nội dung</label>
                                <div className="mt-2">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
                                        placeholder="Nhập nội dung chi tiết..."
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-center text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Gửi Tin Nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
