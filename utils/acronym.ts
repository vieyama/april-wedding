export const colorPallet = [
  "linear-gradient(to top, #439bfd, #6dd5ed)", //gradient blue
  "linear-gradient(to top, #11998e, #38ef7d)", //gradient green
  "linear-gradient(to top, #fc4a1a, #f7b733)", //gradient orange
  "linear-gradient(to top, #ff9966, #ff5e62)", //gradient black orange
  "linear-gradient(to top, #7f00ff, #e100ff)", //gradient purple
  "linear-gradient(to top, #0cebeb, #20e3b2, #29ffc6)", //gradient bright green
  "linear-gradient(to top, #D387AB, #E899DC)", //gradient pink
  "linear-gradient(to top, #96E4DF, #4DCCC6)", //gradient Login screen
];

const getAcronym = (name: string, id: any) => {
  const splittedName = name.split(" ");
  let acronym = name;
  if (splittedName.length > 1) {
    acronym = splittedName.reduce(
      (response: any, word: string | any[]) => response + word.slice(0, 1),
      ""
    );
  }
  acronym = acronym.slice(0, 2).toUpperCase();

  const randomColor =
    (id + name)
      .split("")
      .reduce((arr: any, next: string) => arr + next.charCodeAt(0), 0) %
    colorPallet.length;

  return { color: colorPallet[randomColor], acronym };
};

export default getAcronym;
