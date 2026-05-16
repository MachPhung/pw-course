let height = 153;
console.log("Chiều cao của tôi: " + height + " cm"); // Example height
if (height > 100) {
	console.log(
		"Cân nặng lý tưởng của bạn là: " +
			((height - 100) * 9) / 10 +
			"kg " +
			"Cân nặng tối đa của bạn là: " +
			(height - 100) +
			"kg " +
			"Mức cân tối thiểu của bạn là: " +
			((height - 100) * 8) / 10 +
			"kg",
	);
}
