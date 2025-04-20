import * as Const from "../shared/Constants";

//Based on transaction.schema.json
export class Transaction {
    transactionId: string;
    itemId: string;
    quantity: number;
    description: string;
    category: string;
    totalPrice: number;
    transactionDate: Date;
    paymentMethod: string;
    fullfillmentMethod: string;
    status: string;
    buyerName: string;

    constructor(
        transactionId: string,
        itemId: string,
        quantity: number,
        description: string,
        category: string,
        totalPrice: number,
        transactionDate: Date,
        paymentMethod: string,
        fullfillmentMethod: string,
        status: string,
        buyerName: string
    ) {
        this.transactionId = transactionId;
        this.itemId = itemId;
        this.quantity = quantity;
        this.description = description;
        this.category = category;
        this.totalPrice = totalPrice;
        this.transactionDate = transactionDate;
        this.paymentMethod = paymentMethod;
        this.fullfillmentMethod = fullfillmentMethod;
        this.status = status;
        this.buyerName = buyerName;
    }
    static fromJson(json: any): Transaction {
        return new Transaction(
            json.transactionId,
            json.itemId,
            json.quantity,
            json.description,
            json.category,
            json.totalPrice,
            new Date(json.transactionDate),
            json.paymentMethod,
            json.fullfillmentMethod,
            json.status,
            json.buyerName
        );
    }
    toJson(): any {
        return {
            transactionId: this.transactionId,
            itemId: this.itemId,
            quantity: this.quantity,
            description: this.description,
            category: this.category,
            totalPrice: this.totalPrice,
            transactionDate: this.transactionDate.toISOString(),
            paymentMethod: this.paymentMethod,
            fullfillmentMethod: this.fullfillmentMethod,
            status: this.status,
            buyerName: this.buyerName
        };
    }
    static fromJsonArray(jsonArray: any[]): Transaction[] {
        return jsonArray.map((json) => Transaction.fromJson(json));
    }
}

export class TransactionHandler {
    items: { [itemId: string]: Transaction[] };
    constructor() {
        this.items = {};
    }
    addTransaction(transaction: Transaction): void {
        if (!this.items[transaction.itemId]) {
            this.items[transaction.itemId] = [];
        }
        this.items[transaction.itemId].push(transaction);
    }

    addTransactions(transactions: Transaction[]): void {
        transactions.forEach((transaction) => {
            this.addTransaction(transaction);
        });
    }

    removeTransactionsByItemId(itemId: string): void {
        if (this.items[itemId]) {
            delete this.items[itemId];
        }
    }

    getTransactions(itemId: string): Transaction[] {
        return this.items[itemId] || [];
    }
    getAllTransactions(): Transaction[] {
        return Object.values(this.items).flat();
    }
    getTransactionsByDate(itemId: string, date: Date): Transaction[] {
        return this.items[itemId]?.filter(
            (transaction) =>
                transaction.transactionDate.toDateString() === date.toDateString()
        ) || [];
    }
    getTransactionsByStatus(itemId: string, status: string): Transaction[] {
        return this.items[itemId]?.filter(
            (transaction) => transaction.status === status
        ) || [];
    }
    getTransactionsByPaymentMethod(itemId: string, paymentMethod: string): Transaction[] {
        return this.items[itemId]?.filter(
            (transaction) => transaction.paymentMethod === paymentMethod
        ) || [];
    }
    getTransactionsByFullfillmentMethod(itemId: string, fullfillmentMethod: string): Transaction[] {
        return this.items[itemId]?.filter(
            (transaction) => transaction.fullfillmentMethod === fullfillmentMethod
        ) || [];
    }
    getTransactionsByCategory(itemId: string, category: string): Transaction[] {
        return this.items[itemId]?.filter(
            (transaction) => transaction.category === category
        ) || [];
    }
    getTransactionsByBuyerName(itemId: string, buyerName: string): Transaction[] {
        return this.items[itemId]?.filter(
            (transaction) => transaction.buyerName === buyerName
        ) || [];
    }

    getGrossProfit(itemId: string): number {
        const transactions = this.getTransactions(itemId);
        return transactions.reduce((total, transaction) => {
            if (transaction.status === "completed") {
                return total + transaction.totalPrice;
            }
            return total;
        }, 0);
    }

}

export function fetchTransactionData(): Promise<void | TransactionHandler> {
    return fetch(Const.TRANSACTION_FILE)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            const transactionHandler = new TransactionHandler();
            const transactions = Transaction.fromJsonArray(data);
            transactionHandler.addTransactions(transactions);
            return transactionHandler;
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
}

export class Part {
    partName: string;
    description: string;
    imageUrl: string;
    sold: boolean;
    constructor(
        partName: string,
        description: string,
        imageUrl: string,
        sold: boolean
    ) {
        this.partName = partName;
        this.description = description;
        this.imageUrl = imageUrl;
        this.sold = sold;
    }
}

export class Item {
    itemId: string;
    name: string;
    price: number;
    quantity: number;
    shortDescription: string;
    longDescription: string;
    missingParts: Part[];
    defects: Part[];
    accessories: Part[];
    condition: string;
    brand: string;
    model: string;
    thumbnailUrl: string;
    tags: string[];
    complementaryImages: string[];
    priceNew: number;
    urlNew: string;
    category: string;
    location: string;

    constructor(
        itemId: string,
        name: string,
        price: number,
        quantity: number,
        shortDescription: string,
        longDescription: string,
        missingParts: Part[],
        defects: Part[],
        accessories: Part[],
        condition: string,
        brand: string,
        model: string,
        thumbnailUrl: string,
        tags: string[],
        complementaryImages: string[],
        priceNew: number,
        urlNew: string,
        category: string,
        location: string
    ) {
        this.itemId = itemId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.missingParts = missingParts;
        this.defects = defects;
        this.accessories = accessories;
        this.condition = condition;
        this.brand = brand;
        this.model = model;
        this.thumbnailUrl = thumbnailUrl;
        this.tags = tags;
        this.complementaryImages = complementaryImages;
        this.priceNew = priceNew;
        this.urlNew = urlNew;
        this.category = category;
        this.location = location;
    }
}

export class ItemHandler {
    items: { [itemId: string]: Item };
    constructor() {
        this.items = {};
    }

    addItem(item: Item): void {
        this.items[item.itemId] = item;
    }

    removeItem(itemId: string): void {
        if (this.items[itemId]) {
            delete this.items[itemId];
        }
    }
    getItem(itemId: string): Item | null {
        return this.items[itemId] || null;
    }
    getAllItems(): Item[] {
        return Object.values(this.items);
    }
    getItemsByCategory(category: string): Item[] {
        return Object.values(this.items).filter(
            (item) => item.category === category
        );
    }
    getItemsByCondition(condition: string): Item[] {
        return Object.values(this.items).filter(
            (item) => item.condition === condition
        );
    }
    getItemsByBrand(brand: string): Item[] {
        return Object.values(this.items).filter(
            (item) => item.brand === brand
        );
    }
    getItemsByModel(model: string): Item[] {
        return Object.values(this.items).filter(
            (item) => item.model === model
        );
    }
    getItemsByTag(tag: string): Item[] {
        return Object.values(this.items).filter(
            (item) => item.tags.includes(tag)
        );
    }
    getItemsByLocation(location: string): Item[] {
        return Object.values(this.items).filter(
            (item) => item.location === location
        );
    }
    getItemsByPriceRange(minPrice: number, maxPrice: number): Item[] {
        return Object.values(this.items).filter(
            (item) => item.price >= minPrice && item.price <= maxPrice
        );
    }
    getItemsByQuantity(minQuantity: number, maxQuantity: number): Item[] {
        return Object.values(this.items).filter(
            (item) => item.quantity >= minQuantity && item.quantity <= maxQuantity
        );
    }

}

export function fetchItemData(): Promise<void | ItemHandler> {
    return fetch(Const.ITEMS_FILE)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            const itemHandler = new ItemHandler();
            const items = data.map((item: any) => {
                return new Item(
                    item.itemId,
                    item.name,
                    item.price,
                    item.quantity,
                    item.shortDescription,
                    item.longDescription,
                    item.missingParts.map((part: any) => new Part(part.partName, part.description, part.imageUrl, part.sold)),
                    item.defects.map((part: any) => new Part(part.partName, part.description, part.imageUrl, part.sold)),
                    item.accessories.map((part: any) => new Part(part.partName, part.description, part.imageUrl, part.sold)),
                    item.condition,
                    item.brand,
                    item.model,
                    item.thumbnailUrl,
                    item.tags,
                    item.complementaryImages,
                    item.priceNew,
                    item.urlNew,
                    item.category,
                    item.location
                );
            });
            items.forEach((item: Item) => {
                itemHandler.addItem(item);
            });
            return itemHandler;
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
}

export class Pagination {
    page: number;
    itemsPerPage: number;
    totalItems: number;

    constructor(page: number, itemsPerPage: number, totalItems: number) {
        this.page = page;
        this.itemsPerPage = itemsPerPage;
        this.totalItems = totalItems;
    }

    getTotalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    getStartIndex(): number {
        return (this.page - 1) * this.itemsPerPage;
    }
    getEndIndex(): number {
        return Math.min(this.getStartIndex() + this.itemsPerPage, this.totalItems);
    }
    getCurrentPageItems<T>(items: T[]): T[] {
        return items.slice(this.getStartIndex(), this.getEndIndex());
    }
    hasNextPage(): boolean {
        return this.page < this.getTotalPages();
    }
    hasPreviousPage(): boolean {
        return this.page > 1;
    }
    nextPage(): void {
        if (this.hasNextPage()) {
            this.page++;
        }
    }
    previousPage(): void {
        if (this.hasPreviousPage()) {
            this.page--;
        }
    }
    resetPage(): void {
        this.page = 1;
    }
    setPage(page: number): void {
        if (page > 0 && page <= this.getTotalPages()) {
            this.page = page;
        }
    }
    setItemsPerPage(itemsPerPage: number): void {
        if (itemsPerPage > 0) {
            this.itemsPerPage = itemsPerPage;
        }
    }
    setTotalItems(totalItems: number): void {
        if (totalItems >= 0) {
            this.totalItems = totalItems;
        }
    }
    getCurrentPage(): number {
        return this.page;
    }
    getItemsPerPage(): number {
        return this.itemsPerPage;
    }
    getTotalItemsCount(): number {
        return this.totalItems;
    }
    getCurrentPageInfo(): string {
        return `Page ${this.page} of ${this.getTotalPages()} (${this.totalItems} items total)`;
    }
    getCurrentPageItemsCount(): number {
        return this.getEndIndex() - this.getStartIndex();
    }
    getCurrentPageItemsInfo(): string {
        return `Showing ${this.getCurrentPageItemsCount()} items on page ${this.page} of ${this.getTotalPages()}`;
    }
}

export class Search {
    searchTerm: string;
    searchField: string;
    searchResults: Item[];

    constructor(searchTerm: string, searchField: string) {
        this.searchTerm = searchTerm;
        this.searchField = searchField;
        this.searchResults = [];
    }
    setSearchTerm(searchTerm: string): void {
        this.searchTerm = searchTerm;
    }
    setSearchField(searchField: string): void {
        this.searchField = searchField;
    }
    setSearchResults(searchResults: Item[]): void {
        this.searchResults = searchResults;
    }
    getSearchTerm(): string {
        return this.searchTerm;
    }
    getSearchField(): string {
        return this.searchField;
    }
    getSearchResults(): Item[] {
        return this.searchResults;
    }
    // search(whereToSearch: string, value: string): void {
    //     const searchResults = Object.values(this.searchResults).filter((item) => {
    //         if (whereToSearch === "name") {
    //             return item.name.toLowerCase().includes(value.toLowerCase());
    //         } else if (whereToSearch === "description") {
    //             return item.shortDescription.toLowerCase().includes(value.toLowerCase()) || item.longDescription.toLowerCase().includes(value.toLowerCase());
    //         } else if (whereToSearch === "category") {
    //             return item.category.toLowerCase().includes(value.toLowerCase());
    //         } else if (whereToSearch === "brand") {
    //             return item.brand.toLowerCase().includes(value.toLowerCase());
    //         } else if (whereToSearch === "model") {
    //             return item.model.toLowerCase().includes(value.toLowerCase());
    //         } else if (whereToSearch === "condition") {
    //             return item.condition.toLowerCase().includes(value.toLowerCase());
    //         } else if (whereToSearch === "location") {
    //             return item.location.toLowerCase().includes(value.toLowerCase());
    //         } else if (whereToSearch === "tags") {
    //             return item.tags.some((tag) => tag.toLowerCase().includes(value.toLowerCase()));
    //         }
    //         return false;
    //     });
    //     this.setSearchResults(searchResults);
    // }

    // This filter function looks for the value in name, shortDescription, longDescription, category, brand, model, condition, location and tags
    // It returns an array of items that match the search term in any of these fields
    search(value: string, transactions: TransactionHandler): Item[] {
        const searchResults = Object.values(this.searchResults).filter((item) => {
            return (
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.shortDescription.toLowerCase().includes(value.toLowerCase()) ||
                item.longDescription.toLowerCase().includes(value.toLowerCase()) ||
                item.category.toLowerCase().includes(value.toLowerCase()) ||
                item.brand.toLowerCase().includes(value.toLowerCase()) ||
                item.model.toLowerCase().includes(value.toLowerCase()) ||
                item.condition.toLowerCase().includes(value.toLowerCase()) ||
                item.location.toLowerCase().includes(value.toLowerCase()) ||
                item.tags.some((tag) => tag.toLowerCase().includes(value.toLowerCase()))
            );
        });

        searchResults.sort((a, b) => { return 1 });
        this.setSearchResults(searchResults);



        return searchResults;
    }
}

export class SystemHandler {
    itemHandler: ItemHandler;
    transactionHandler: TransactionHandler;



    constructor() {
        this.itemHandler = new ItemHandler();
        this.transactionHandler = new TransactionHandler();
    }

    fetchData(): Promise<void> {
        return Promise.all([fetchItemData(), fetchTransactionData()])
            .then(([itemHandler, transactionHandler]) => {
                if (itemHandler) {
                    this.itemHandler = itemHandler;
                }
                if (transactionHandler) {
                    this.transactionHandler = transactionHandler;
                }
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
            });
    }

    addItem(item: Item): void {
        this.itemHandler.addItem(item);
    }

    removeItem(itemId: string): void {
        this.itemHandler.removeItem(itemId);
        this.transactionHandler.removeTransactionsByItemId(itemId);
    }
    addTransaction(transaction: Transaction): void {
        this.transactionHandler.addTransaction(transaction);
    }
    removeTransaction(transactionId: string): void {
        const transactions = this.transactionHandler.getAllTransactions();
        const transaction = transactions.find(
            (t) => t.transactionId === transactionId
        );
        if (transaction) {
            this.transactionHandler.removeTransactionsByItemId(transaction.itemId);
        }
    }
    getItem(itemId: string): Item | null {
        return this.itemHandler.getItem(itemId);
    }
    getAllItems(): Item[] {
        return this.itemHandler.getAllItems();
    }
    getAllTransactions(): Transaction[] {
        return this.transactionHandler.getAllTransactions();
    }
    getTransactions(itemId: string): Transaction[] {
        return this.transactionHandler.getTransactions(itemId);
    }
    getTransactionsByDate(itemId: string, date: Date): Transaction[] {
        return this.transactionHandler.getTransactionsByDate(itemId, date);
    }
    getTransactionsByStatus(itemId: string, status: string): Transaction[] {
        return this.transactionHandler.getTransactionsByStatus(itemId, status);
    }
    getTransactionsByPaymentMethod(itemId: string, paymentMethod: string): Transaction[] {
        return this.transactionHandler.getTransactionsByPaymentMethod(itemId, paymentMethod);
    }
    getTransactionsByFullfillmentMethod(itemId: string, fullfillmentMethod: string): Transaction[] {
        return this.transactionHandler.getTransactionsByFullfillmentMethod(itemId, fullfillmentMethod);
    }
    getTransactionsByCategory(itemId: string, category: string): Transaction[] {
        return this.transactionHandler.getTransactionsByCategory(itemId, category);
    }
    getTransactionsByBuyerName(itemId: string, buyerName: string): Transaction[] {
        return this.transactionHandler.getTransactionsByBuyerName(itemId, buyerName);
    }
    getGrossProfit(itemId: string): number {
        return this.transactionHandler.getGrossProfit(itemId);
    }
    getItemsByCategory(category: string): Item[] {
        return this.itemHandler.getItemsByCategory(category);
    }
    getItemsByCondition(condition: string): Item[] {
        return this.itemHandler.getItemsByCondition(condition);
    }
    getItemsByBrand(brand: string): Item[] {
        return this.itemHandler.getItemsByBrand(brand);
    }
    getItemsByModel(model: string): Item[] {
        return this.itemHandler.getItemsByModel(model);
    }
    getItemsByTag(tag: string): Item[] {
        return this.itemHandler.getItemsByTag(tag);
    }

    getLeftQuantity(itemId: string): number {
        const item = this.itemHandler.getItem(itemId);
        const transactions = this.transactionHandler.getTransactions(itemId);
        const soldQuantity = transactions.reduce((total, transaction) => {
            if (transaction.status === "completed") {
                return total + transaction.quantity;
            }
            return total;
        }, 0);

        if (item) {
            return item.quantity - soldQuantity;
        }
        return 0;
    }

    generateRandomSystemData(): void {
        const categories = Const.CATEGORIES;
        const paymentMethods = Const.PAYMENT_METHODS;
        const fullfillmentMethods = Const.FULLFILLMENT_METHODS;
        const conditions = Const.CONDITIONS;
        const randomPictures = [
            "https://picsum.photos/702/936",
            "https://picsum.photos/1296/1728",
            "https://picsum.photos/540/864",
            "https://picsum.photos/512/512",]

        for (let i = 0; i < 17; i++) {
            const itemId = `item${i}`;
            const name = `Item ${i}`;
            const price = Math.floor(Math.random() * 100) + 1;
            const quantity = Math.floor(Math.random() * 20) + 1;
            const shortDescription = `Short description of item ${i}`;
            const longDescription = `Long description of item ${i}`;
            const missingParts: Part[] = [];
            const defects: Part[] = [];
            const accessories: Part[] = [];
            const condition =
                conditions[Math.floor(Math.random() * conditions.length)];
            const brand = `Brand ${i}`;
            const model = `Model ${i}`;
            const thumbnailUrl = randomPictures[Math.floor(Math.random() * randomPictures.length)];
            const tags: string[] = [`tag${Math.floor(Math.random() * 5)}`];
            const complementaryImages: string[] = [
                randomPictures[Math.floor(Math.random() * randomPictures.length)],
                randomPictures[Math.floor(Math.random() * randomPictures.length)],
                randomPictures[Math.floor(Math.random() * randomPictures.length)],
            ]
            const priceNew =
                Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100);
            const urlNew = `https://example.com/item${i}_new`;
            const category =
                categories[Math.floor(Math.random() * categories.length)];
            const location = `Location ${i}`;

            this.itemHandler.addItem(
                new Item(
                    itemId,
                    name,
                    price,
                    quantity,
                    shortDescription,
                    longDescription,
                    missingParts,
                    defects,
                    accessories,
                    condition,
                    brand,
                    model,
                    thumbnailUrl,
                    tags,
                    complementaryImages,
                    priceNew,
                    urlNew,
                    category,
                    location
                )
            );

            for (let j = 0; j < 6; j++) {
                this.transactionHandler.addTransaction(
                    new Transaction(
                        `transaction${j}`,
                        itemId,
                        Math.floor(Math.random() * 3) + 1,
                        `Transaction description ${j}`,
                        category,
                        price * quantity,
                        new Date(),
                        paymentMethods[
                        Math.floor(Math.random() * paymentMethods
                            .length
                        )
                        ],
                        fullfillmentMethods[
                        Math.floor(Math.random() * fullfillmentMethods
                            .length
                        )
                        ],
                        "completed",
                        `Buyer ${j}`
                    )
                );
            }
        }
    }
}
