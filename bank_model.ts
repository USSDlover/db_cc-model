type NetworkError = "USER_NETWORK_DOWN" | "SERVER_ERROR" | "TIMEOUT";

type AccountType = "REGULAR" | "POCKET";

type Currency = "SEK" | "NOK" | "USD" | "EUR";

type Account = {
    name: string;
    iban: string;
    amount: number;
    type: AccountType;
} & (
    // Use conditional type instead of intersection
    AccountType extends "REGULAR" ? { currency: "DKK" } : { pockets: Record<Currency, number> }
    );


type ChatMessage = {
    from: 'SUPPORT' | 'USER';
    createdAt: string;
    message: string;
};

type ChatWindowState = "MINIMIZED" | "OPEN" | "FULLSCREEN";

// Union type for all pages
type Page = "ACCOUNTS" | "SUPPORT";

type ActivePage = Page;

type ChatData = {
    connected: boolean;
    queuePosition?: number;
    busyTimes?: {
        most: {
            days: string[];
            times: string[];
        };
        least: {
            days: string[];
            times: string[];
        };
    };
    messages: ChatMessage[];
};

interface NetbankAppState {
    // User info
    userInfo: {
        loggedIn: boolean;
        email?: string;
        name?: string;
        loadingUser: boolean;
        userError?: NetworkError;
    }

    // Pages
    activePage: ActivePage;

    // Accounts page
    accountPage: {
        accounts: Account[];
        accountsLoading: boolean;
        accountsError?: NetworkError;
    }

    // Support page
    supportPage: {
        chatData: ChatData;
        chatWindowState: ChatWindowState;
    }

    // Chat messages (accessible on all pages)
    chatMessages: ChatMessage[];
}
