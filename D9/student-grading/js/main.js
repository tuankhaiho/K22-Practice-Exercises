let math = 8.5;
let literature = 7;
let english = 9;

if (math < 0 || math > 10 || literature < 0 || literature > 10 || english < 0 || english > 10) {
    console.log("Dữ liệu không hợp lệ");
} else {
    let averageScore = (math + literature + english) / 3;
    
    let minScore = math;
    if (literature < minScore) {
        minScore = literature;
    }
    if (english < minScore) {
        minScore = english;
    }

    let studentRank = "Yếu";

    if (averageScore >= 9.0 && minScore >= 8.0) {
        studentRank = "Xuất sắc";
    } else if (averageScore >= 8.0 && minScore >= 6.5) {
        studentRank = "Giỏi";
    } else if (averageScore >= 6.5 && minScore >= 5.0) {
        studentRank = "Khá";
    } else if (averageScore >= 5.0 && minScore >= 3.5) {
        studentRank = "Trung bình";
    }

    console.log("Điểm trung bình: " + averageScore.toFixed(2) + " - Học lực: " + studentRank);
}
