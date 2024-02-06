import { forwardRef, useMemo, useState } from 'react';
import { Input } from './ui/input';
import citiesList from '../lib/cities-list';

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // forward a location string with no return value
  onLocationSelected: (location: string) => void;
}
// we need a ref for is necessary for React Hook Form for to put focus on a form input that is invalid
export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    // manage the state of the focus of the location dropdown if out of focus then hide it
    const [hasFocus, setHasFocus] = useState(false);
    const [locationSearchInput, setLocationSearchInput] = useState('');

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split(' ');

      // return the cities list and filter
      return (
        citiesList
          .map((city) => `${city.name}, ${city.subcountry}, ${city.country} `)
          // if I type in Be for example it should start showing Berlin, so it should show cities not countries
          .filter(
            (city) =>
              city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
              searchWords.every((word) =>
                city.toLowerCase().includes(word.toLowerCase())
              )
          )
          .slice(0, 5) // at most show 5of the auto completes, and only change when input of location changes
      );
    }, [locationSearchInput]);

    return (
      <div className="relative">
        {/* no we also tell react that anything we type into this input should be stored in the locationSearchInput state */}
        <Input
          placeholder="Search for a city"
          type="search"
          value={locationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          {...props}
          ref={ref}
        />
        {locationSearchInput.trim() && hasFocus && (
          <div className="absolute w-full divide-y z-20 bg-background shadow-xl border-x border-b rounded-b-lg">
            {!cities.length && <p className="p-3">No results found</p>}
            {cities.map((city) => (
              // we use on mouse down instead of onClick because
              // onClick makes the focus disappear before the click is received
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocationSearchInput('');
                }}
                key={city}
                className="block w-full text-start p-2"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
