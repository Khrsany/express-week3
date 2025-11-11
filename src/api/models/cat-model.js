// Mock data (testikissat)
const catItems = [
  {
    cat_id: 1,
    cat_name: "Luna",
    weight: 4.2,
    owner: "Ali",
    filename: "luna123",
    birthdate: "2020-05-15",
  },
  {
    cat_id: 2,
    cat_name: "Milo",
    weight: 3.8,
    owner: "Abbas",
    filename: "milo456",
    birthdate: "2021-09-10",
  },
];

const listAllCats = () => catItems;

const findCatById = (id) => catItems.find((item) => item.cat_id == id);

const addCat = (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const newId = catItems[catItems.length - 1].cat_id + 1;
  catItems.push({
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  });
  return { cat_id: newId };
};

export { listAllCats, findCatById, addCat };
