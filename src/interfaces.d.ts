export interface EventOnChange {
	target: {
		value: string;
	};
}

export interface EventPreventDefault {
	preventDefault(): void;
}
