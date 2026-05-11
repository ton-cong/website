package com.example.demo.util;

public class NumberToWordsVN {
    private static final String[] units = {"", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"};
    private static final String[] tens = {"", "mười", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"};

    public static String convert(double amount) {
        if (amount == 0) return "Không đồng";
        
        long number = (long) amount;
        String words = "";
        
        long billion = number / 1000000000;
        long million = (number % 1000000000) / 1000000;
        long thousand = (number % 1000000) / 1000;
        long remainder = number % 1000;

        if (billion > 0) words += convertSmall(billion) + " tỷ ";
        if (million > 0) words += convertSmall(million) + " triệu ";
        if (thousand > 0) words += convertSmall(thousand) + " nghìn ";
        
        if (remainder > 0) {
            if (billion > 0 || million > 0 || thousand > 0) {
                if (remainder < 100) words += "không trăm ";
            }
            words += convertSmall(remainder);
        }

        return words.trim().substring(0, 1).toUpperCase() + words.trim().substring(1) + " đồng";
    }

    private static String convertSmall(long n) {
        String s = "";
        int hundreds = (int) (n / 100);
        int t = (int) ((n % 100) / 10);
        int u = (int) (n % 10);

        if (hundreds > 0) {
            s += units[hundreds] + " trăm ";
        }

        if (t > 1) {
            s += tens[t] + " ";
            if (u == 1) s += "mốt";
            else if (u == 5) s += "lăm";
            else if (u > 0) s += units[u];
        } else if (t == 1) {
            s += "mười ";
            if (u == 5) s += "lăm";
            else if (u > 0) s += units[u];
        } else if (u > 0) {
            if (hundreds > 0) s += "linh ";
            s += units[u];
        }
        return s.trim();
    }
}
