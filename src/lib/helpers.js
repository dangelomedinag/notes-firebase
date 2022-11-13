export const random = (min, max) => Math.round(Math.random() * (max - min + 1) + min);

const LOREMIPSUM =
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt facilis sint eveniet, neque dolorum incidunt quae molestiae? Doloribus eligendi itaque fugiat illo molestiae, iure corporis suscipit omnis laboriosam unde cum!';

export const loremIpsum = {
	title: () => LOREMIPSUM.slice(random(1, 4), random(23, 30)),
	content: () => LOREMIPSUM.slice(random(1, 100), random(115, 200))
};
