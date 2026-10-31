function UserProfileCard({ avatar, fullName, jobTitle, isOnline, skills }) {
    const handleContactClick = () => {
        alert(`Đang kết nối với ${fullName}`);
    };
    return (
        <div className="w-80 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
            <img
                src={avatar}
                alt={fullName}
                className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-gray-50"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-1">{fullName}</h2>
            <p className="text-sm font-medium text-gray-500 mb-3">{jobTitle}</p>
            <div className="flex items-center gap-2 mb-4">
                <span
                    className={`w-2.5 h-2.5 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-400"}`}
                ></span>
                <span>{isOnline ? "Online" : "Offline"}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {skills &&
                    skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200"
                        >
                            {skill}
                        </span>
                    ))}
            </div>

            <button
                onClick={handleContactClick}
                className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-xl transition duration-200 hover:scale-105 shadow-sm hover:shadow-md cursor-pointer"
            >
                Liên hệ
            </button>
        </div>
    );
}

export default UserProfileCard;
