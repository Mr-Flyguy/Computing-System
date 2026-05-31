export function isPalindrom(value) {
    if (value === null || value === undefined) return false;
    const normalized = String(value).toLowerCase().replace(/[^a-z0-9а-яё]/gi, "");
    return normalized === normalized.split("").reverse().join("");
}

export function sumOfUniqueElements(numbers) {
    if (!Array.isArray(numbers)) return 0;
    const unique = Array.from(new Set(numbers.map((n) => Number(n))));
    return unique.reduce((s, v) => s + (isNaN(v) ? 0 : v), 0);
}
