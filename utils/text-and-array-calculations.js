export function isPalindrom(value) {
    if (value === null || value === undefined) return false;
    const normalized = String(value).toLowerCase().replace(/[^a-z0-9а-яё]/gi, "");
    return normalized === normalized.split("").reverse().join("");
}

export function sumOfUniqueElements(numbers) {
    if (!Array.isArray(numbers)) return 0;

    // flatten one level of nested arrays (defensive, atomic change)
    const flattened = numbers.reduce((acc, cur) => {
        if (Array.isArray(cur)) return acc.concat(cur);
        return acc.concat(cur);
    }, []);

    const numeric = flattened.map((n) => Number(n)).filter((n) => !isNaN(n));
    const unique = Array.from(new Set(numeric));
    return unique.reduce((s, v) => s + v, 0);
}
