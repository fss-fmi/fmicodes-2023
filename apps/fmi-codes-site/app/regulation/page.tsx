import { ReactNode } from 'react';
import FancyHeading from '../../components/fancy-heading/fancy-heading';
import { getRegulations } from '../../pages/api/regulations';
import RegulationDisclosure from '../../components/regulation-disclosure/regulation-disclosure';

/**
 * Defines the "/regulation" page.
 * @return {ReactNode} Regulation page component.
 * @constructor
 */
export default async function RegulationPage(): Promise<ReactNode> {
  const regulations = await getRegulations();

  return (
    <div className="regulation-page">
      <FancyHeading title="Регламент" />

      {regulations.map((regulation, i) => (
        <RegulationDisclosure key={i} regulation={regulation} />
      ))}

      <div className="acrylic px-4 mt-2 py-2 text-md text-white rounded-lg">
        Ние от ФСС на ФМИ Ви пожелаваме успех и се надяваме да се забавлявате.
        За допълнително въпроси може да се свържете с нас по всички социални
        мрежи.
      </div>
    </div>
  );
}
