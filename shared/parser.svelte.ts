import * as Const from "./Constants";

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

    static randomTransaction(item: Item, index: number = 1): Transaction {
        const transactionId = `transaction-${index}`;
        const itemId = item.itemId;
        const quantity = Math.floor(Math.random() * 10) + 1;
        const description = `Transaction ${index} for ${itemId}`;
        const category = Const.CATEGORIES[Math.floor(Math.random() * Const.CATEGORIES.length)];
        const totalPrice = item.price * quantity;
        const transactionDate = new Date();
        const paymentMethod = Const.PAYMENT_METHODS[Math.floor(Math.random() * Const.PAYMENT_METHODS.length)];
        const fullfillmentMethod = Const.FULLFILLMENT_METHODS[Math.floor(Math.random() * Const.FULLFILLMENT_METHODS.length)];
        const status = Math.random() > 0.5 ? "completed" : "pending";
        const buyerName = `Buyer ${Math.floor(Math.random() * 100)}`;
        return new Transaction(
            transactionId,
            itemId,
            quantity,
            description,
            category,
            totalPrice,
            transactionDate,
            paymentMethod,
            fullfillmentMethod,
            status,
            buyerName
        );
    }

    static sampleTransaction(): Transaction {
        return new Transaction(
            "transaction-1",
            "item-1",
            2,
            "Sample transaction",
            "Category A",
            200,
            new Date(),
            "Credit Card",
            "Shipping",
            "completed",
            "John Doe"
        );
    }
}

export class Part {
    partName: string;
    description: string;
    imageUrls: string[];
    available: boolean;

    constructor(
        partName: string,
        description: string,
        imageUrls: string[],
        available: boolean
    ) {
        this.partName = partName;
        this.description = description;
        this.imageUrls = imageUrls;
        this.available = available;
    }

    static randomPart(index: number): Part {
        const fmt = new Intl.NumberFormat("en-US", {
            minimumIntegerDigits: 3
        });


        const partName = `Part ${fmt.format(index)}`;
        const description = `Description for ${partName}`;
        const imageUrls = ["https://picsum.photos/512/512", "https://picsum.photos/512/512"];
        const available = Math.random() > 0.5;
        return new Part(partName, description, imageUrls, available);
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

    getItem(): Item {
        return this;
    }
    getItemId(): string {
        return this.itemId;
    }
    getName(): string {
        return this.name;
    }
    getPrice(): number {
        return this.price;
    }
    getQuantity(): number {
        return this.quantity;
    }
    getShortDescription(): string {
        return this.shortDescription;
    }
    getLongDescription(): string {
        return this.longDescription;
    }
    getMissingParts(): Part[] {
        return this.missingParts;
    }
    getDefects(): Part[] {
        return this.defects;
    }
    getAccessories(): Part[] {
        return this.accessories;
    }
    getCondition(): string {
        return this.condition;
    }
    getBrand(): string {
        return this.brand;
    }
    getModel(): string {
        return this.model;
    }
    getThumbnailUrl(): string {
        return this.thumbnailUrl;
    }
    getTags(): string[] {
        return this.tags;
    }
    getComplementaryImages(): string[] {
        return this.complementaryImages;
    }
    getPriceNew(): number {
        return this.priceNew;
    }
    getUrlNew(): string {
        return this.urlNew;
    }
    getCategory(): string {
        return this.category;
    }
    getLocation(): string {
        return this.location;
    }

    static randomItem(index: number = 1): Item {
        const itemId = `item-${index}`;
        const name = `Item ${index}`;
        const price = Math.floor(Math.random() * 100) + 1;
        const quantity = Math.floor(Math.random() * 10) + 1;
        const shortDescription = `Short description for ${name}`;
        const longDescription = `Long description for ${name}`;
        const missingParts: Part[] = Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => Part.randomPart(i));
        const defects: Part[] = Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => Part.randomPart(i));
        const accessories: Part[] = Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => Part.randomPart(i));
        const condition = Const.CONDITIONS[Math.floor(Math.random() * Const.CONDITIONS.length)];
        const brand = `Brand ${Math.floor(Math.random() * 10)}`;
        const model = `Model ${Math.floor(Math.random() * 10)}`;
        const thumbnailUrl = "https://picsum.photos/512/512";
        const tags: string[] = Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => `Tag ${i}`);
        const complementaryImages: string[] = Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => "https://picsum.photos/512/512");
        const priceNew = Math.floor(Math.random() * 100) + 1;
        const urlNew = `http://example.com/${itemId}-new.jpg`;
        const category = Const.CATEGORIES[Math.floor(Math.random() * Const.CATEGORIES.length)];
        const location = `Location ${Math.floor(Math.random() * 10)}`;
        return new Item(
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
        );
    }

    static emptyItem(): Item {
        return new Item(
            "",
            "",
            0,
            0,
            "",
            "",
            [],
            [],
            [],
            "",
            "",
            "",
            "",
            [],
            [],
            0,
            "",
            "",
            ""
        );
    }
}

export class Pagination {
    page: number = $state(1);
    itemsPerPage: number = $state(0);
    private reference: System = $state(System.emptySystem());
    totalItems: number = $derived(this.reference.systemInfo.length)

    constructor(page: number, itemsPerPage: number, system: System) {
        if (page < 1) {
            page = 1;
        }
        if (itemsPerPage < 1) {
            itemsPerPage = 1;
        }

        this.itemsPerPage = itemsPerPage;
        this.page = page;
        this.reference = system;
    }

    totalPages: number = $derived(Math.ceil(this.totalItems / this.itemsPerPage));

    startIndex: number = $derived((this.page - 1) * this.itemsPerPage);

    endIndex: number = $derived(Math.min(this.startIndex + this.itemsPerPage, this.totalItems));

    hasNextPage: boolean = $derived(this.page < this.totalPages);

    hasPreviousPage: boolean = $derived(this.page > 1);

    nextPage = () => {
        if (this.hasNextPage) {
            console.log("Next page", this.page);
            ++this.page
        }
    };

    previousPage = () => {
        if (this.hasPreviousPage) {
            --this.page;
        }
    }

    resetPage(): void {
        this.page = 1;
    }

    setPage(page: number): void {
        if (page > 0 && page <= this.totalPages) {
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

    currentPage: number = $derived(this.page);

    getItemsPerPage(): number {
        return this.itemsPerPage;
    }
    getTotalItemsCount(): number {
        return this.totalItems;
    }
    getCurrentPageInfo(): string {
        return `Page ${this.page} of ${this.totalPages} (${this.totalItems} items total)`;
    }
    getCurrentPageItemsCount(): number {
        return this.endIndex - this.startIndex;
    }
    getCurrentPageItemsInfo(): string {
        return `Showing ${this.getCurrentPageItemsCount()} items on page ${this.page} of ${this.totalPages}`;
    }
    getDebugInfo(): string {
        return `Page: ${this.page}, Items per page: ${this.itemsPerPage}, Total items: ${this.totalItems}`;
    }


    debug(): string {
        //All parameters
        let debugInfo = `Page: ${this.page}, Items per page: ${this.itemsPerPage}, Total items: ${this.totalItems}\n`;

        debugInfo += `Start index: ${this.startIndex}, End index: ${this.endIndex}\n`;
        debugInfo += `Has next page: ${this.hasNextPage}, Has previous page: ${this.hasPreviousPage}\n`;
        return debugInfo;
    }
}

function locationOf(element: SystemInfo, store: Array<SystemInfo>, start: number, end: number): number {
    if (store.length === 0) return -1;
    var pivot = Math.floor(start + (end - start) / 2);
    if (store[pivot] === element) return pivot;
    if (end - start <= 1) {
        return store[pivot].greaterThan(element) ? pivot - 1 : pivot;
    }
    if (store[pivot].lessThan(element)) {
        return locationOf(element, store, pivot, end);
    } else {
        return locationOf(element, store, start, pivot);
    }
}

function insert(element: SystemInfo, store: Array<SystemInfo>): void {
    store.splice(locationOf(element, store, 0, store.length) + 1, 0, element);
}

function cyrb53(str: string, seed: number = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function getNewItemId(kvstore: { [key: string]: SystemInfo }, store: Array<SystemInfo>): string {
    let index = store.length;
    let itemId = "";
    do {
        index = cyrb53(`${index}${Math.random()}`);
        itemId = "item-" + index;
    }
    while (kvstore[itemId] !== null);

    return itemId;
}

export class SystemInfo extends Item {
    public transactions: Transaction[];
    public soldOut: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    constructor(item: Item, transactions: Transaction[]) {
        super(item.itemId, item.name, item.price, item.quantity, item.shortDescription, item.longDescription, item.missingParts, item.defects, item.accessories, item.condition, item.brand, item.model, item.thumbnailUrl, item.tags, item.complementaryImages, item.priceNew, item.urlNew, item.category, item.location);
        this.transactions = transactions;
        this.soldOut = this.calculateSoldOut();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static randomSystemInfo(index: number = 1): SystemInfo {
        const item = Item.randomItem(index);
        const transactions: Transaction[] = Array.from({ length: Math.floor(Math.random() * item.quantity) }, (_, i) => Transaction.randomTransaction(item, i));
        return new SystemInfo(item, transactions);
    }

    static emptySystemInfo(): SystemInfo {
        return new SystemInfo(Item.emptyItem(), []);
    }

    private calculateSoldOut(): boolean {
        const totalSold = this.transactions.filter(transaction => transaction.status === "completed").reduce((acc, transaction) => acc + transaction.quantity, 0);
        return totalSold >= this.quantity;
    }

    addTransaction(transaction: Transaction): void {
        this.transactions.push(transaction);
        this.soldOut = this.calculateSoldOut();
        this.updatedAt = new Date();
    }

    addTransactions(transactions: Transaction[]): void {
        this.transactions.push(...transactions);
        this.soldOut = this.calculateSoldOut();
        this.updatedAt = new Date();
    }

    removeTransaction(transactionId: string): void {
        const index = this.transactions.findIndex(transaction => transaction.transactionId === transactionId);
        if (index !== -1) {
            this.transactions.splice(index, 1);
            this.soldOut = this.calculateSoldOut();
        }
        this.updatedAt = new Date();
    }

    updateTransaction(transactionId: string, updatedTransaction: Transaction): void {
        const index = this.transactions.findIndex(transaction => transaction.transactionId === transactionId);
        if (index !== -1) {
            this.transactions[index] = updatedTransaction;
            this.soldOut = this.calculateSoldOut();
        }
        this.updatedAt = new Date();
    }

    getTransactions(): Transaction[] {
        return this.transactions;
    }

    getSoldOut(): boolean {
        return this.soldOut;
    }

    getLeft(): number {
        const totalSold = this.transactions.filter(transaction => transaction.status === "completed").reduce((acc, transaction) => acc + transaction.quantity, 0);
        return this.quantity - totalSold;
    }

    compareTo(other: SystemInfo): number {
        if (this.soldOut && !other.soldOut) {
            return 1;
        } else if (!this.soldOut && other.soldOut) {
            return -1;
        } else if (this.createdAt < other.createdAt) {
            return -1;
        } else if (this.createdAt > other.createdAt) {
            return 1;
        } else {
            return 0;
        }
    }

    greaterThan(other: SystemInfo): boolean {
        return this.compareTo(other) > 0;
    }

    lessThan(other: SystemInfo): boolean {
        return this.compareTo(other) < 0;
    }
}

export class System {
    systemInfo: SystemInfo[] = $state([]);
    system: { [key: string]: SystemInfo };

    search(text: string): SystemInfo[] {
        return this.systemInfo.filter(systemInfo => systemInfo.name.toLowerCase().includes(text.toLowerCase())
            || systemInfo.itemId.toLowerCase().includes(text.toLowerCase())
            || systemInfo.category.toLowerCase().includes(text.toLowerCase())
            || systemInfo.brand.toLowerCase().includes(text.toLowerCase())
            || systemInfo.model.toLowerCase().includes(text.toLowerCase())
            || systemInfo.location.toLowerCase().includes(text.toLowerCase())
            || systemInfo.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase()))
            || systemInfo.shortDescription.toLowerCase().includes(text.toLowerCase())
            || systemInfo.longDescription.toLowerCase().includes(text.toLowerCase()));
    }

    constructor() {
        this.systemInfo = [];
        this.system = {};
    }

    getItem(itemId: string): SystemInfo | null {
        return this.system[itemId] || null;
    }

    private locationOf(element: SystemInfo, start: number, end: number): number {
        if (this.systemInfo.length === 0) return -1;
        var pivot = Math.floor(start + (end - start) / 2);
        if (this.systemInfo[pivot] === element) return pivot;
        if (end - start <= 1) {
            return this.systemInfo[pivot].greaterThan(element) ? pivot - 1 : pivot;
        }
        if (this.systemInfo[pivot].lessThan(element)) {
            return this.locationOf(element, pivot, end);
        } else {
            return this.locationOf(element, start, pivot);
        }
    }

    private insert(element: SystemInfo): void {
        this.systemInfo.splice(this.locationOf(element, 0, this.systemInfo.length) + 1, 0, element);
    }

    addSystemInfo(systemInfo: SystemInfo): void {
        this.insert(systemInfo);
        this.system[systemInfo.itemId] = systemInfo;
    }

    addTransaction(itemId: string, transaction: Transaction): void {
        if (this.system[itemId]) {
            this.system[itemId].addTransaction(transaction);
        } else {
            console.error(`Item with ID ${itemId} not found.`);
        }
    }

    addTransactions(itemId: string, transactions: Transaction[]): void {
        if (this.system[itemId]) {
            this.system[itemId].addTransactions(transactions);
        }
        else {
            console.error(`Item with ID ${itemId} not found.`);
        }
    }
    removeTransaction(itemId: string, transactionId: string): void {
        if (this.system[itemId]) {
            this.system[itemId].removeTransaction(transactionId);
        } else {
            console.error(`Item with ID ${itemId} not found.`);
        }
    }
    updateTransaction(itemId: string, transactionId: string, updatedTransaction: Transaction): void {
        if (this.system[itemId]) {
            this.system[itemId].updateTransaction(transactionId, updatedTransaction);
        } else {
            console.error(`Item with ID ${itemId} not found.`);
        }
    }

    getNewItemId(): string {
        let index = this.systemInfo.length;
        let itemId = "";
        do {
            index = cyrb53(`${index}${Math.random()}`);
            itemId = "item-" + index;
        }
        while (this.getItem(itemId) !== null);

        return itemId;
    }

    addRandom(incr: number): void {
        const store: Array<SystemInfo> = this.systemInfo.slice();
        const system: { [key: string]: SystemInfo } = this.system;

        const length = store.length;

        for (let i: number = length; i < incr + length; ++i) {
            const systemInfo = SystemInfo.randomSystemInfo(i);
            insert(systemInfo, store);
            system[systemInfo.itemId] = systemInfo;
        }
        this.systemInfo = store;
        this.system = system;
        console.log("Added...", incr, "items");
    }

    static randomSystem(size: number): System {
        const store: Array<SystemInfo> = [];
        const system: { [key: string]: SystemInfo } = {};

        const sysInfo = new System()
        for (let i = 0; i < size; ++i) {
            const systemInfo = SystemInfo.randomSystemInfo(i);
            insert(systemInfo, store);
            system[systemInfo.itemId] = systemInfo;
        }
        sysInfo.system = system;
        sysInfo.systemInfo = store;

        return sysInfo;
    }

    static emptySystem(): System {
        return new System();
    }


    serialize() {
    }
}

