import FAQItem from "./FAQItem";

export default function FAQList({ faqs, onSelectFaq }) {
    return (
        <div className="w-full max-w-3xl mx-auto">
            {faqs.length > 0 &&
                faqs.map((faq) => (
                    <FAQItem key={faq.id} faq={faq} onSelectFaq={onSelectFaq} />
                ))}
        </div>
    );
}
