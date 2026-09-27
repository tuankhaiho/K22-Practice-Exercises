const userA_searches = [
    "áo thun",
    "quần jeans",
    "áo khoác",
    "áo thun",
    "giày cừu",
];
const userB_searches = ["quần jeans", "mũ bảo hiểm", "giày cừu", "balo"];

const getUniqueTags = function (arr) {
    return [...new Set(arr)];
};
console.log(getUniqueTags(userA_searches));

const getCommonTags = function (arr1, arr2) {
    if (!arr1.length || !arr2.length) return [];
    const unique = getUniqueTags(arr1);
    return unique.filter((tag) => arr2.includes(tag));
};

console.log(getCommonTags(userA_searches, userB_searches));
console.log(getCommonTags(["áo thun", "áo thun", "balo"], ["áo thun"]));
console.log(getCommonTags(["áo thun"], ["balo"]));
console.log(getUniqueTags([]));