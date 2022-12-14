const DATE_UNITS = {
	day: 86400,
	hour: 3600,
	minute: 60,
	second: 1
};

export const getSecondsDiff = (timestamp: number) => (Date.now() - timestamp) / 1000;
export const getUnitAndValueDate = (secondsElapsed: number) => {
	for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
		if (secondsElapsed >= secondsInUnit || unit === 'second') {
			const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
			return { value, unit };
		}
	}
};

export const getTimeAgo = (timestamp: number) => {
	const rtf = new Intl.RelativeTimeFormat('en', {
		style: 'short'
	});

	const secondsElapsed = getSecondsDiff(timestamp);
	const { value, unit } = getUnitAndValueDate(secondsElapsed);
	return rtf.format(value, unit);
};
