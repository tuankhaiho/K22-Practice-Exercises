import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFire } from "@fortawesome/free-solid-svg-icons";

export default function FAQItem({ faq, onSelectFaq }) {
    const [isOpen, setIsOpen] = useState(false);
    const { id, question, answer, category, isHot } = faq;

    const handleViewDetails = (e) => {
        e.stopPropagation();
        setIsOpen(true);
        onSelectFaq(id);
    };

    return (
        <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <div
                className="p-5 flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">
                            {category}
                        </span>
                        {isHot === true && (
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                                <FontAwesomeIcon icon={faFire} className="text-red-500" />
                                Hot
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{question}</h3>
                </div>

                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </div>

            <div
                className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
            >
                <div className="p-5 border-t border-gray-100 bg-white">
                    <p className="text-gray-600 mb-4 leading-relaxed">{answer}</p>
                    <button
                        onClick={handleViewDetails}
                        className="px-5 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm active:scale-95"
                    >
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
}