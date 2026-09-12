let distance = 1.5;

if (typeof distance !== "number" || distance <= 0) {
    console.log("Số km không hợp lệ.");
} else {
    let totalFare = 0;

    if (distance <= 1) {
        totalFare = 15000;
    } else if (distance <= 5) {
        totalFare = 15000 + (distance - 1) * 13500;
    } else {
        totalFare = 15000 + 4 * 13500 + (distance - 5) * 11000;
    }

    if (distance > 12) {
        totalFare = totalFare * 0.9;
    }

    console.log("Tổng tiền cước: " + totalFare + " VNĐ");
}
