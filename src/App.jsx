import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";

const CATEGORIES = ["Todos", "Animais", "Comida", "Cores", "Números", "Família", "Natureza"];

const VOCABULARY = [
  // Animais
  { id: "dog", cat: "Animais", icon: "🐶", pt: "Cachorro", en: { word: "Dog", lang: "en-US" }, it: { word: "Cane", lang: "it-IT" }, ja: { word: "いぬ", romaji: "Inu", lang: "ja-JP" } },
  { id: "cat", cat: "Animais", icon: "🐱", pt: "Gato", en: { word: "Cat", lang: "en-US" }, it: { word: "Gatto", lang: "it-IT" }, ja: { word: "ねこ", romaji: "Neko", lang: "ja-JP" } },
  { id: "rabbit", cat: "Animais", icon: "🐰", pt: "Coelho", en: { word: "Rabbit", lang: "en-US" }, it: { word: "Coniglio", lang: "it-IT" }, ja: { word: "うさぎ", romaji: "Usagi", lang: "ja-JP" } },
  { id: "lion", cat: "Animais", icon: "🦁", pt: "Leão", en: { word: "Lion", lang: "en-US" }, it: { word: "Leone", lang: "it-IT" }, ja: { word: "らいおん", romaji: "Raion", lang: "ja-JP" } },
  
  // Comida
  { id: "apple", cat: "Comida", icon: "🍎", pt: "Maçã", en: { word: "Apple", lang: "en-US" }, it: { word: "Mela", lang: "it-IT" }, ja: { word: "りんご", romaji: "Ringo", lang: "ja-JP" } },
  { id: "water", cat: "Comida", icon: "💧", pt: "Água", en: { word: "Water", lang: "en-US" }, it: { word: "Acqua", lang: "it-IT" }, ja: { word: "みず", romaji: "Mizu", lang: "ja-JP" } },
  { id: "icecream", cat: "Comida", icon: "🍦", pt: "Sorvete", en: { word: "Ice cream", lang: "en-US" }, it: { word: "Gelato", lang: "it-IT" }, ja: { word: "あいす", romaji: "Aisu", lang: "ja-JP" } },
  { id: "bread", cat: "Comida", icon: "🍞", pt: "Pão", en: { word: "Bread", lang: "en-US" }, it: { word: "Pane", lang: "it-IT" }, ja: { word: "ぱん", romaji: "Pan", lang: "ja-JP" } },
  
  // Cores
  { id: "red", cat: "Cores", icon: "🔴", pt: "Vermelho", en: { word: "Red", lang: "en-US" }, it: { word: "Rosso", lang: "it-IT" }, ja: { word: "あか", romaji: "Aka", lang: "ja-JP" } },
  { id: "blue", cat: "Cores", icon: "🔵", pt: "Azul", en: { word: "Blue", lang: "en-US" }, it: { word: "Blu", lang: "it-IT" }, ja: { word: "あお", romaji: "Ao", lang: "ja-JP" } },
  { id: "yellow", cat: "Cores", icon: "🟡", pt: "Amarelo", en: { word: "Yellow", lang: "en-US" }, it: { word: "Giallo", lang: "it-IT" }, ja: { word: "きいろ", romaji: "Kiiro", lang: "ja-JP" } },
  { id: "green", cat: "Cores", icon: "🟢", pt: "Verde", en: { word: "Green", lang: "en-US" }, it: { word: "Verde", lang: "it-IT" }, ja: { word: "みどり", romaji: "Midori", lang: "ja-JP" } },
  
  // Números
  { id: "one", cat: "Números", icon: "1️⃣", pt: "Um", en: { word: "One", lang: "en-US" }, it: { word: "Uno", lang: "it-IT" }, ja: { word: "いち", romaji: "Ichi", lang: "ja-JP" } },
  { id: "two", cat: "Números", icon: "2️⃣", pt: "Dois", en: { word: "Two", lang: "en-US" }, it: { word: "Due", lang: "it-IT" }, ja: { word: "に", romaji: "Ni", lang: "ja-JP" } },
  { id: "three", cat: "Números", icon: "3️⃣", pt: "Três", en: { word: "Three", lang: "en-US" }, it: { word: "Tre", lang: "it-IT" }, ja: { word: "さん", romaji: "San", lang: "ja-JP" } },
  { id: "four", cat: "Números", icon: "4️⃣", pt: "Quatro", en: { word: "Four", lang: "en-US" }, it: { word: "Quattro", lang: "it-IT" }, ja: { word: "よん", romaji: "Yon", lang: "ja-JP" } },

  // Família
  { id: "father", cat: "Família", icon: "👨", pt: "Papai", en: { word: "Father", lang: "en-US" }, it: { word: "Papà", lang: "it-IT" }, ja: { word: "おとうさん", romaji: "Otousan", lang: "ja-JP" } },
  { id: "mother", cat: "Família", icon: "👩", pt: "Mamãe", en: { word: "Mother", lang: "en-US" }, it: { word: "Mamma", lang: "it-IT" }, ja: { word: "おかあさん", romaji: "Okaasan", lang: "ja-JP" } },
  { id: "friend", cat: "Família", icon: "🤝", pt: "Amigo", en: { word: "Friend", lang: "en-US" }, it: { word: "Amico", lang: "it-IT" }, ja: { word: "ともだち", romaji: "Tomodachi", lang: "ja-JP" } },

  // Natureza
  { id: "sun", cat: "Natureza", icon: "☀️", pt: "Sol", en: { word: "Sun", lang: "en-US" }, it: { word: "Sole", lang: "it-IT" }, ja: { word: "たいよう", romaji: "Taiyou", lang: "ja-JP" } },
  { id: "moon", cat: "Natureza", icon: "🌙", pt: "Lua", en: { word: "Moon", lang: "en-US" }, it: { word: "Luna", lang: "it-IT" }, ja: { word: "つき", romaji: "Tsuki", lang: "ja-JP" } },
  { id: "star", cat: "Natureza", icon: "⭐", pt: "Estrela", en: { word: "Star", lang: "en-US" }, it: { word: "Stella", lang: "it-IT" }, ja: { word: "ほし", romaji: "Hoshi", lang: "ja-JP" } }
];

const LANGUAGES = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "ja", label: "日本語", flag: "🇯🇵" },
  { id: "it", label: "Italiano", flag: "🇮🇹" }
];

export default function App() {
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedCat, setSelectedCat] = useState("Todos");
  const [mode, setMode] = useState("explore");
  const [stars, setStars] = useState(0);
  
  // Flashcard State
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz State
  const [quizOptions, setQuizOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);

  // Match Game State
  const [matchCards, setMatchCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  const filteredData = VOCABULARY.filter(
    (item) => selectedCat === "Todos" || item.cat === selectedCat
  );
  const activeCard = filteredData[cardIdx] || filteredData[0];

  // Carrega do Supabase ou usa o localStorage se falhar
  useEffect(() => {
    async function loadProgress() {
      const local = localStorage.getItem("lingo_kid_stars");
      if (local) setStars(parseInt(local, 10));

      try {
        if (supabase) {
          const { data } = await supabase
            .from("progress")
            .select("stars")
            .eq("user_name", "lele")
            .single();

          if (data && data.stars !== undefined) {
            setStars(data.stars);
            localStorage.setItem("lingo_kid_stars", data.stars.toString());
          }
        }
      } catch (err) {
        console.warn("Modo offline ou Supabase pendente:", err);
      }
    }
    loadProgress();
  }, []);

  // Atualiza as estrelas no Supabase
  const addStar = async (amt = 1) => {
    const next = stars + amt;
    setStars(next);
    try {
      await supabase
        .from("progress")
        .update({ stars: next })
        .eq("user_name", "lele");
    } catch (err) {
      console.error("Erro ao salvar no Supabase:", err);
    }
  };

  const speak = (text, lang) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const playActiveWord = () => {
    const wordData = activeCard[selectedLang];
    speak(wordData.word, wordData.lang);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev + 1) % filteredData.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev - 1 + filteredData.length) % filteredData.length);
  };

  const initQuiz = (targetIdx = 0) => {
    const target = filteredData[targetIdx] || filteredData[0];
    const correct = target[selectedLang].word;
    const distractors = VOCABULARY.filter((x) => x.id !== target.id)
      .map((x) => x[selectedLang].word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const opts = [correct, ...distractors].sort(() => 0.5 - Math.random());
    setQuizOptions(opts);
    setFeedback(null);
  };

  const handleQuizAnswer = (word) => {
    const correct = activeCard[selectedLang].word;
    if (word === correct) {
      setFeedback("correct");
      addStar(1);
      speak(word, activeCard[selectedLang].lang);
      setTimeout(() => {
        const next = (cardIdx + 1) % filteredData.length;
        setCardIdx(next);
        initQuiz(next);
      }, 1000);
    } else {
      setFeedback("wrong");
    }
  };

  const initMatchGame = () => {
    const sample = [...filteredData].sort(() => 0.5 - Math.random()).slice(0, 4);
    const deck = [];
    sample.forEach((item) => {
      deck.push({ uid: `${item.id}-icon`, id: item.id, content: item.icon, type: "icon" });
      deck.push({ uid: `${item.id}-word`, id: item.id, content: item[selectedLang].word, type: "word" });
    });
    setMatchCards(deck.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
    setMatchedPairs([]);
  };

  const handleMatchSelect = (card) => {
    if (selectedCards.length === 2 || selectedCards.some((c) => c.uid === card.uid) || matchedPairs.includes(card.id)) {
      return;
    }
    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      if (newSelected[0].id === newSelected[1].id) {
        setMatchedPairs((prev) => [...prev, newSelected[0].id]);
        setSelectedCards([]);
        addStar(2);
        const hitWord = VOCABULARY.find((v) => v.id === newSelected[0].id)[selectedLang];
        speak(hitWord.word, hitWord.lang);
      } else {
        setTimeout(() => setSelectedCards([]), 900);
      }
    }
  };

  useEffect(() => {
    setCardIdx(0);
    setIsFlipped(false);
    if (mode === "quiz") initQuiz(0);
    if (mode === "match") initMatchGame();
  }, [selectedCat, selectedLang, mode]);

  const level = Math.floor(stars / 10) + 1;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-3 font-sans select-none">
      {/* Top Header */}
      <header className="w-full max-w-lg flex justify-between items-center py-2 px-3 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="text-xl">⭐</span>
            <span className="font-extrabold text-amber-400 text-lg">{stars}</span>
          </div>
          <div className="bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-indigo-400">
            Nível {level}
          </div>
        </div>

        <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLang(lang.id)}
              className={`text-xl px-2.5 py-1 rounded-lg transition-all ${
                selectedLang === lang.id
                  ? "bg-slate-700 shadow border border-slate-600 scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {lang.flag}
            </button>
          ))}
        </div>
      </header>

      {/* Categorias */}
      <div className="w-full max-w-lg flex gap-2 overflow-x-auto py-3 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCat === cat
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Abas de Modo */}
      <nav className="w-full max-w-lg grid grid-cols-3 gap-2 mb-3">
        <button
          onClick={() => setMode("explore")}
          className={`py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${
            mode === "explore"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-indigo-400 text-white shadow-lg"
              : "bg-slate-900 border-slate-800 text-slate-400"
          }`}
        >
          🎴 Explorar
        </button>
        <button
          onClick={() => setMode("quiz")}
          className={`py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${
            mode === "quiz"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 border-pink-400 text-white shadow-lg"
              : "bg-slate-900 border-slate-800 text-slate-400"
          }`}
        >
          🎯 Quiz
        </button>
        <button
          onClick={() => setMode("match")}
          className={`py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${
            mode === "match"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 border-teal-400 text-white shadow-lg"
              : "bg-slate-900 border-slate-800 text-slate-400"
          }`}
        >
          🧩 Memória
        </button>
      </nav>

      {/* Área Central */}
      <main className="w-full max-w-lg flex-1 flex flex-col justify-center items-center">
        {mode === "explore" && activeCard && (
          <div className="w-full flex flex-col items-center">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full h-80 bg-gradient-to-b from-slate-900 to-slate-850 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between items-center text-center cursor-pointer shadow-2xl relative overflow-hidden transition-all hover:border-slate-700"
            >
              <div className="w-full flex justify-between items-center text-xs font-bold text-slate-400">
                <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  {activeCard.cat}
                </span>
                <span>Toque para ver tradução 🔄</span>
              </div>

              <div className="text-8xl my-auto transition-transform hover:scale-110 duration-200">
                {activeCard.icon}
              </div>

              <div className="w-full">
                {!isFlipped ? (
                  <div>
                    <h2 className="text-3xl font-black tracking-wide text-white">
                      {activeCard[selectedLang].word}
                    </h2>
                    {selectedLang === "ja" && (
                      <p className="text-indigo-400 font-bold text-sm tracking-widest mt-1">
                        {activeCard.ja.romaji}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-400">
                      {activeCard.pt}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">Português</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={prevCard}
                className="bg-slate-800 hover:bg-slate-700 active:scale-95 text-xl w-12 h-12 rounded-2xl border border-slate-700 flex items-center justify-center shadow"
              >
                ⬅️
              </button>
              <button
                onClick={playActiveWord}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 active:scale-95 text-white font-black px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center gap-2"
              >
                <span className="text-2xl">🔊</span> Ouvir Voz
              </button>
              <button
                onClick={nextCard}
                className="bg-slate-800 hover:bg-slate-700 active:scale-95 text-xl w-12 h-12 rounded-2xl border border-slate-700 flex items-center justify-center shadow"
              >
                ➡️
              </button>
            </div>
          </div>
        )}

        {mode === "quiz" && activeCard && (
          <div className="w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 flex flex-col items-center shadow-xl">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Como se diz isso em {LANGUAGES.find((l) => l.id === selectedLang).label}?
            </span>

            <div className="text-7xl my-3">{activeCard.icon}</div>
            <p className="text-slate-400 text-sm mb-4 font-semibold">({activeCard.pt})</p>

            <div className="grid grid-cols-1 gap-2.5 w-full">
              {quizOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleQuizAnswer(opt)}
                  className="bg-slate-800 hover:bg-slate-750 active:scale-98 text-white font-bold py-3.5 px-4 rounded-xl border border-slate-700 hover:border-indigo-500 text-lg transition-all shadow"
                >
                  {opt}
                </button>
              ))}
            </div>

            {feedback === "correct" && (
              <div className="mt-4 text-emerald-400 font-extrabold flex items-center gap-1.5 animate-bounce">
                🎉 Correto! +1 Estrela!
              </div>
            )}
            {feedback === "wrong" && (
              <div className="mt-4 text-rose-400 font-bold text-sm">
                ❌ Tente outra vez!
              </div>
            )}
          </div>
        )}

        {mode === "match" && (
          <div className="w-full flex flex-col items-center">
            <div className="grid grid-cols-4 gap-2.5 w-full">
              {matchCards.map((card) => {
                const isSelected = selectedCards.some((c) => c.uid === card.uid);
                const isMatched = matchedPairs.includes(card.id);

                return (
                  <button
                    key={card.uid}
                    onClick={() => handleMatchSelect(card)}
                    disabled={isMatched}
                    className={`h-24 rounded-2xl flex flex-col items-center justify-center p-2 font-black transition-all border ${
                      isMatched
                        ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-60"
                        : isSelected
                        ? "bg-indigo-600 border-indigo-400 text-white scale-105 shadow-lg"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {isSelected || isMatched ? (
                      card.type === "icon" ? (
                        <span className="text-4xl">{card.content}</span>
                      ) : (
                        <span className="text-xs text-center leading-tight">{card.content}</span>
                      )
                    ) : (
                      <span className="text-2xl text-slate-600 font-bold">❓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {matchedPairs.length === 4 && (
              <div className="mt-6 flex flex-col items-center">
                <p className="text-emerald-400 font-extrabold text-lg mb-2">
                  🏆 Parabéns! Você completou todos os pares!
                </p>
                <button
                  onClick={initMatchGame}
                  className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-xl font-bold text-white shadow-lg"
                >
                  Jogar Novamente
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="w-full max-w-lg py-3 text-center text-xs text-slate-500">
        {mode === "explore" && `${cardIdx + 1} de ${filteredData.length} palavras`}
      </footer>
    </div>
  );
}