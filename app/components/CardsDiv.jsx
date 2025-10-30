import { getExperiences } from "../lib/getExperiences";
import ExperincesCard from "./ExperincesCard";

export default async function CardsDiv({ search }) {
  const data = await getExperiences();
  const searchTerm = search?.trim();
  let filtered = [];

  if (!Array.isArray(data) || data.length === 0)
    return <p className="textColor text-center mt-80">No experiences found!</p>;

  if (!searchTerm) {
    filtered = data;
  } else {
    const sanitaizeSearch = searchTerm.toLowerCase();

    filtered = data.filter((item) =>
      item.location?.toLowerCase().includes(sanitaizeSearch)
    );
  }
  if (filtered.length === 0)
    return <p className="textColor text-center mt-80">No experiences found!</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:w-fit lg:grid-cols-4 gap-6 p-6 mx-auto">
      {filtered.map((experience) => (
        <ExperincesCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
}
