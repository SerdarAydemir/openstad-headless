import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useQuizContext } from '../context/QuizContext';

export function GemeenteSelector() {
  const { config, state, selectGemeente, dispatch } = useQuizContext();
  const { general, gemeenten } = config;

  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // Filter gemeenten based on search query
  const filteredGemeenten = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return gemeenten
      .filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.officialName?.toLowerCase().includes(q) ||
          g.searchTerms?.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [gemeenten, searchQuery]);

  const selectedGemeente = useMemo(
    () => gemeenten.find((g) => g.id === state.selectedGemeenteId),
    [gemeenten, state.selectedGemeenteId]
  );

  const handleSelect = useCallback(
    (id: string) => {
      selectGemeente(id);
      const gemeente = gemeenten.find((g) => g.id === id);
      if (gemeente) {
        setSearchQuery(gemeente.name);
      }
      setIsOpen(false);
      setHighlightIndex(-1);
    },
    [selectGemeente, gemeenten]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setIsOpen(true);
      setHighlightIndex(-1);
      // Clear selection when typing
      if (state.selectedGemeenteId) {
        dispatch({ type: 'SELECT_GEMEENTE', gemeenteId: '' });
      }
    },
    [state.selectedGemeenteId, dispatch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev < filteredGemeenten.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightIndex >= 0 && filteredGemeenten[highlightIndex]) {
            handleSelect(filteredGemeenten[highlightIndex].id);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightIndex(-1);
          break;
      }
    },
    [isOpen, filteredGemeenten, highlightIndex, handleSelect]
  );

  const handleProceed = useCallback(() => {
    if (state.selectedGemeenteId) {
      dispatch({ type: 'SET_SCREEN', screen: 'quiz' });
    }
  }, [state.selectedGemeenteId, dispatch]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightIndex] as HTMLElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightIndex]);

  return (
    <div className="fjs-gemeente">
      <header className="fjs-header">
        <span className="fjs-header-title">{general.widgetTitle}</span>
      </header>

      <div className="fjs-card fjs-gemeente-card">
        <h2 className="fjs-gemeente-title">{general.gemeenteSelectTitle}</h2>

        <div
          className="fjs-gemeente-search"
          role="combobox"
          aria-expanded={isOpen}>
          <div className="fjs-search-input-wrapper">
            <svg
              className="fjs-search-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none">
              <circle
                cx="9"
                cy="9"
                r="6"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M13.5 13.5L17 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="fjs-search-input"
              placeholder={general.gemeenteSelectPlaceholder}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsOpen(true)}
              role="searchbox"
              aria-label={general.gemeenteSelectTitle}
              aria-autocomplete="list"
              aria-controls="fjs-gemeente-list"
            />
          </div>

          {isOpen && filteredGemeenten.length > 0 && (
            <ul
              ref={listRef}
              id="fjs-gemeente-list"
              className="fjs-gemeente-list"
              role="listbox">
              {filteredGemeenten.map((g, index) => (
                <li
                  key={g.id}
                  className={`fjs-gemeente-item ${
                    state.selectedGemeenteId === g.id
                      ? 'fjs-gemeente-item--selected'
                      : ''
                  } ${
                    highlightIndex === index
                      ? 'fjs-gemeente-item--highlighted'
                      : ''
                  }`}
                  role="option"
                  aria-selected={state.selectedGemeenteId === g.id}
                  onClick={() => handleSelect(g.id)}>
                  <svg
                    className="fjs-gemeente-pin"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none">
                    <path
                      d="M8 1C5.24 1 3 3.24 3 6C3 9.75 8 15 8 15C8 15 13 9.75 13 6C13 3.24 10.76 1 8 1ZM8 7.5C7.17 7.5 6.5 6.83 6.5 6C6.5 5.17 7.17 4.5 8 4.5C8.83 4.5 9.5 5.17 9.5 6C9.5 6.83 8.83 7.5 8 7.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{g.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className={`fjs-btn fjs-btn-lg ${
            state.selectedGemeenteId ? 'fjs-btn-primary' : 'fjs-btn-disabled'
          }`}
          onClick={handleProceed}
          disabled={!state.selectedGemeenteId}
          aria-label="Ga verder">
          Ga verder
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="fjs-btn-icon">
            <path
              d="M7 4L13 10L7 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p className="fjs-gemeente-helper">{general.gemeenteSelectHelper}</p>
      </div>
    </div>
  );
}
