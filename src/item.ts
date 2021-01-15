import { fetchItems } from "@jser/data-fetcher";
import dayjs from "dayjs";
import groupby from "lodash.groupby";

(async function () {
    const items = await fetchItems();
    const group = groupby(items, (item: any) => dayjs(item.date).format("YYYY-MM"));
    const years = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
    const result: {
        [index: string]: number[];
    } = {};
    years.forEach((year) => {
        Array.from({ length: 12 }).map((_, index) => {
            const key = `${year}-${String(index + 1).padStart(2, "0")}`;
            const match = group[key];
            if (!result[year]) {
                result[year] = [];
            }
            result[year].push(match.length);
        });
    });
    console.log(
        "year" +
            "," +
            Array.from({ length: 12 })
                .map((_, i) => i + 1 + "月")
                .join(",")
    );
    Object.entries(result).forEach(([key, value]) => {
        console.log(key + "," + value.join(","));
    });
})();
