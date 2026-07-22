import { Instagram, Facebook } from "lucide-react";
import {Link} from "react-router-dom";
import {useOTWidget} from "../components/OTwidget.jsx";
import Footer from "../components/Footer";
import SEO from "../components/SEO.jsx";
import { breadcrumb } from "../lib/seoSchema.js";



export default function Fifa26() {
    const { openReservationWidget } = useOTWidget();
    return (
        <>
            <SEO
                title="Silent H Toronto Menu | Modern Mexican Cuisine (Menu)"
                description="Explore the food and drink menu at Silent H in Toronto."
                url="https://www.silenthnyc.com/menu"
                jsonLd={breadcrumb("Menu", "https://www.silenthnyc.com/menu")}
            />
        <div className="bg-[#ece1d4] w-full min-h-screen">
            {/* Header Navigation */}
            <header className="bg-[#eb4660] h-[96px] relative">
                <div className="absolute left-[70px] top-[16px]">
                    <h1 className="font-['Mondwest',sans-serif] text-[#0b0b0b] text-[40px] tracking-wider">SILENT H</h1>
                </div>
                <nav className="flex gap-[24px] items-center justify-center pt-[26px]">
                    <button className="px-[28px] py-[20px]">
                        <p className="font-['NeueBit',sans-serif] text-[#0b0b0b] text-[20px] tracking-[4px]">MENU</p>
                    </button>
                    <button className="px-[28px] py-[20px]">
                        <p className="font-['NeueBit',sans-serif] text-[#0b0b0b] text-[20px] tracking-[4px]">RESERVATIONS</p>
                    </button>
                    <button className="px-[28px] py-[20px]">
                        <p className="font-['NeueBit',sans-serif] text-[#0b0b0b] text-[20px] tracking-[4px]">PLAN AN EVENT</p>
                    </button>
                    <button className="px-[28px] py-[20px]">
                        <p className="font-['NeueBit',sans-serif] text-[#0b0b0b] text-[20px] tracking-[4px]">OUR STORY</p>
                    </button>
                    <button className="px-[28px] py-[20px]">
                        <p className="font-['NeueBit',sans-serif] text-[#0b0b0b] text-[20px] tracking-[4px]">ENTER AITCH</p>
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className="max-w-[1140px] mx-auto px-4 py-16">
                {/* Hero Section */}
                <h1 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[64px] tracking-[4.48px] mb-16 max-w-screen">
                    Best Place to Watch FIFA World Cup 2026 in Toronto | Silent H
                </h1>

                {/* Intro Section */}
                <div className="mb-16">
                    <p className="font-['NeueBit',sans-serif] text-[#0b0b0b] text-[16px] tracking-[3.2px] uppercase mb-5">
                        May 2026 | Silent H, King West
                    </p>
                    <p className="font-['NeueBit',sans-serif] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] max-w-full">
                        Looking for the best place to watch FIFA World Cup 2026 in Toronto? Silent H on King West offers upscale Mexican cuisine, handcrafted cocktails, and full match coverage all summer long.{' '}
                        <button
                            type="button"
                            onClick={openReservationWidget}
                            className="text-[#7a88c0] underline cursor-pointer hover:text-[#eb4660] transition-colors"
                        >
                            Reserve your table now.
                        </button>
                    </p>
                </div>

                {/* Hero Image */}
                <div className="mb-16 overflow-hidden">
                    <img alt="Silent H restaurant interior" className="w-full h-full object-cover object-center" src={"./fifa1.png"} />
                </div>

                {/* FIFA Badge + Description */}
                <div className="flex gap-[32px] items-center mb-16">
                    <div className="h-[168px] w-[132px] shrink-0">
                        <img alt="FIFA World Cup logo" className="w-full h-full object-contain" src={"./fifa2-2.png"} />
                    </div>
                    <div className="flex-1">
                        <p className="font-['NeueBit',sans-serif] text-[#0b0b0b] text-[16px] tracking-[3.2px] uppercase mb-5">
                            May 2026 | Silent H, King West
                        </p>
                        <h2 className="font-['Mondwest',sans-serif] font-[700]  text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-5">
                            Best Place to Watch FIFA World Cup 2026 in Toronto
                        </h2>
                        <div className="font-['NeueBit',sans-serif] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] space-y-5">
                            <p>
                                The FIFA World Cup 2026 is here — and it's unlike any tournament in history. For the first time ever, the world's biggest sporting event is being co-hosted by Canada, the United States, and Mexico. Toronto is one of the official host cities. BMO Field will see live World Cup matches. The fan zone at Fort York and The Bentway is steps from King West. And this city — one of the most diverse on the planet — is going to be alive with football energy from June 11 all the way to the Final on July 19.
                            </p>
                            <p>
                                Toronto doesn't just watch the World Cup. Toronto lives it. Every neighbourhood, every flag, every community that makes this city what it is has a team worth rooting for.
                            </p>
                            <p>The only question is where you're watching.</p>
                        </div>
                    </div>
                </div>

                {/* Where to Watch Section */}
                <section className="mb-16 max-w-screen">
                    <h2 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-5">
                        Where to Watch FIFA World Cup 2026 in Toronto
                    </h2>
                    <div className="font-['NeueBit',sans-serif] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] space-y-5">
                        <p>
                            Searching for somewhere to watch the World Cup in Toronto? You'll find plenty of screens. Sports bars, patios, living rooms, fan zones — the city is packed for every match.
                        </p>
                        <p>
                            But if you want a FIFA viewing experience that actually matches the cultural weight of this tournament — elevated food, a serious cocktail program, and a room full of people who genuinely care about what's happening on screen — there's one place on King West that delivers all of it.
                        </p>
                    </div>
                    <p className="font-['NeueBit',sans-serif] text-[#0b0b0b] text-[16px] tracking-[3.2px] uppercase mt-5">
                        Silent H. 461 King St W.
                    </p>
                </section>

                {/* Rotated Image */}
                <div className="mb-16">
                    <div className="">
                        <img alt="Silent H restaurant food" className="w-full h-full object-cover " src={"./fifa3.png"} />
                    </div>
                </div>

                {/* Why Silent H Section */}
                <section className="mb-16 max-w-screen">
                    <div className="flex gap-[50px] items-center mb-16">
                        <h2 className="font-['Mondwest',sans-serif] text-[#0b0b0b] text-[40px] font-[700] tracking-[2.8px] leading-none w-[366px]">
                            Why Silent H Is Toronto's Best FIFA Viewing Destination
                        </h2>
                        <div className="flex-1 font-['NeueBit',sans-serif] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] space-y-8">
                            <p>
                                Silent H is one of Toronto's most celebrated upscale Mexican restaurants — and for the FIFA World Cup 2026, it's the most culturally resonant place in the city to catch every match.
                            </p>
                            <p>
                                Toronto is home to fans of every nation in this tournament. Whether you're here for El Tri, Les Rouges, Argentina, Portugal, Brazil, Italy, Morocco, or anyone else flying a flag this summer — Silent H is the place to watch with a room full of people who feel it the same way you do.
                            </p>
                            <p>
                                And with Mexico co-hosting the tournament and opening the entire World Cup on June 11, watching football at a Mexican restaurant isn't just a great option — it's the right one.
                            </p>
                        </div>
                    </div>

                    <h3 className="font-['Mondwest',sans-serif] text-[#0b0b0b] text-[40px] font-[700] tracking-[2.8px] leading-none mb-8">
                        Here's what makes Silent H stand out:
                    </h3>
                    <div className="space-y-8">
                        <div>
                            <p className="font-['Mondwest',sans-serif] font-[900]  text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-3">
                                Full kitchen throughout the tournament
                            </p>
                            <p className="font-['NeueBit',sans-serif] font-[600] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                Elevated Mexican cuisine, not bar snacks
                            </p>
                        </div>
                        <div>
                            <p className="font-['Mondwest',sans-serif] font-[700] ext-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-3">
                                Handcrafted cocktails and a deep tequila and mezcal program
                            </p>
                            <p className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                Built for celebrating goals
                            </p>
                        </div>
                        <div>
                            <p className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-3">
                                Intimate, curated atmosphere
                            </p>
                            <p className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                A real dining experience, not a mega sports bar
                            </p>
                        </div>
                        <div>
                            <p className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-3">
                                Prime King West location
                            </p>
                            <p className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                Minutes from the FIFA Toronto fan zone at Fort York & The Bentway
                            </p>
                        </div>
                        <div>
                            <p className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-3">
                                Private dining available
                            </p>
                            <p className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                Ideal for group bookings, corporate events, and watch partie
                            </p>
                        </div>
                    </div>
                </section>

                {/* The Menu Section */}
                <section className="mb-16 max-w-[946px]">
                    <h2 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-5">
                        The Menu Was Made for This
                    </h2>
                    <div className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] space-y-5">
                        <p>
                            When the whistle blows at Silent H, the kitchen is fully open. Expect elevated Mexican sharing plates, handmade tacos, fresh guacamole and crudo, and a cocktail list anchored by one of the strongest tequila and mezcal programs in the city.
                        </p>
                        <p>
                            This isn't a place where food is an afterthought. At Silent H, the meal and the match are equally part of the experience. Come hungry. Come thirsty. Come ready to celebrate.
                        </p>
                    </div>
                </section>

                {/* Food Image */}
                <div className="mb-16 overflow-hidden">
                    <img alt="Silent H food dishes" className="w-full h-full object-cover object-center" src={"./fifa4.png"} />
                </div>

                {/* CTA Button */}
                <div className="flex justify-center mb-16">
                    <Link
                        to={"/menu"}
                        className="btn font-['NeueBit'] font-bold mt-5 px-12 ml-20.5 md:ml-0 py-3 text-black
               text-[clamp(0.9rem,1.8vw,1.25rem)] bg-[#dfa867] transition-all duration-500 ease-in-out
               tracking-[0.2em] hover:bg-[#ECE1D4] hover:text-black transition active:bg-black active:text-[#EB4660] active:border-transparent"
                    >
                        TASTE OUR MENU
                    </Link>
                </div>

                {/* Canada Schedule */}
                <section className="mb-16 max-w-screen">
                    <h2 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-5">
                        Canada's FIFA 2026 Schedule — Les Rouges at Home
                    </h2>
                    <p className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] mb-8">
                        Canada is in Group B — and they open on home soil right here in Toronto. These are the matches every Canadian needs to be locked in for.
                    </p>
                    <div className="mb-[60px] w-full max-w-[644px] mx-auto overflow-x-auto">
                        <table
                            className="w-full border-collapse border border-[#c9cfdd] bg-[#f4f4f7] text-left font-sans text-[#20212a]">
                            <thead>
                            <tr>
                                <th className="border border-[#c9cfdd] px-4 py-4 text-[14px] font-bold">
                                    Match
                                </th>
                                <th className="border border-[#c9cfdd] px-4 py-4 text-[14px] font-bold">
                                    Date
                                </th>
                                <th className="border border-[#c9cfdd] px-4 py-4 text-[14px] font-bold">
                                    Kickoff<br/>(ET)
                                </th>
                                <th className="border border-[#c9cfdd] px-4 py-4 text-[14px] font-bold">
                                    Venue
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    🇨🇦 Canada vs Bosnia &amp; Herzegovina
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    Friday, June 12
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    3:00 PM
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    BMO Field, Toronto
                                </td>
                            </tr>

                            <tr>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    🇨🇦 Canada vs Qatar
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    Thursday, June 18
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    3:00 PM
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    BC Place, Vancouver
                                </td>
                            </tr>

                            <tr>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    🇨🇦 Switzerland vs Canada
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    Wednesday, June 24
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    3:00 PM
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    BC Place, Vancouver
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                        Canada's opener is right here in Toronto. Whether you're at BMO Field or watching from the best
                        seat on King West, Silent H is where you land before and after.
                    </p>
                </section>

                {/* Mexico Schedule */}
                <section className="mb-16 max-w-screen">
                    <h2 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-5">
                        Mexico's FIFA 2026 Schedule — El Tri Opens the World Cup
                    </h2>
                    <p className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] mb-8">
                        Mexico is in Group A — and they open the entire tournament on Day 1. Three matches to lock in
                        before knockout rounds even begin.
                    </p>
                    <div className="mb-[60px] w-full max-w-[643px] mx-auto overflow-x-auto">
                        <table
                            className="w-full border-collapse border border-[#c9cfdd] bg-[#f4f4f7] text-left font-sans text-[#20212a]">
                            <thead>
                            <tr>
                                <th className="border border-[#c9cfdd] px-4 py-4 text-[14px] font-bold">
                                    Match
                                </th>
                                <th className="border border-[#c9cfdd] px-4 py-4 text-[14px] font-bold">
                                    Date
                                </th>
                                <th className="border border-[#c9cfdd] px-4 py-4 text-[14px] font-bold">
                                    Kickoff<br/>(ET)
                                </th>
                                <th className="border border-[#c9cfdd] px-4 py-4 text-[14px] font-bold">
                                    Venue
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    🇲🇽 Mexico vs South Africa
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    Thursday, June 11
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    3:00 PM
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    Estadio Azteca, Mexico City
                                </td>
                            </tr>

                            <tr>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    🇲🇽 Mexico vs Korea Republic
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    Thursday, June 18
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    9:00 PM
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    Estadio Akron, Guadalajara
                                </td>
                            </tr>

                            <tr>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    🇲🇽 Czechia vs Mexico
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    Wednesday, June 24
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    9:00 PM
                                </td>
                                <td className="border border-[#c9cfdd] px-4 py-4 text-[14px] leading-[1.45]">
                                    Estadio Azteca, Mexico City
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                        There is no more fitting place in Toronto to watch El Tri than a Mexican restaurant on King
                        West. Book your table for June 11 early — it will sell out.
                    </p>
                </section>

                {/* Food Gallery + CTA */}
                <section className="mb-16">
                    <div className="grid grid-cols-4 gap-2 mb-16">
                        <img alt="Food dish 1" className="w-full h-[299px] object-cover" src={"./fifa7.png"}/>
                        <img alt="Food dish 2" className="w-full h-[299px] object-cover" src={"./fifa8.png"}/>
                        <img alt="Food dish 3" className="w-full h-[300px] object-cover" src={"./fifa9.png"}/>
                        <img alt="Food dish 4" className="w-full h-[300px] object-cover" src={"./fifa10.png"}/>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={openReservationWidget}
                            className="btn font-['NeueBit'] font-bold mt-5 px-12 ml-20.5 md:ml-0 py-3 text-black
               text-[clamp(0.9rem,1.8vw,1.25rem)] bg-[#dfa867] transition-all duration-500 ease-in-out
               tracking-[0.2em] hover:bg-[#ECE1D4] hover:text-black transition active:bg-black active:text-[#EB4660] active:border-transparent"
                        >
                            RESERVE A TABLE
                        </button>
                    </div>
                </section>

                {/* Knockout Stage */}
                <section className="mb-16 max-w-[946px]">
                    <h2 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-5">
                        Knockout Stage: June 28 – July 19
                    </h2>
                    <div
                        className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] space-y-5">
                        <p>
                            Once group stage wraps on June 27, the tournament shifts into a brand new format: the Round
                            of 32, starting June 28. From there it's straight knockout football all the way to the Final
                            on July 19 at MetLife Stadium in New Jersey.
                        </p>
                        <p>
                            Silent H will be screening throughout — every round, every high-stakes match, right through
                            to the last kick of the tournament.
                        </p>
                    </div>
                </section>

                {/* BMO Field Section */}
                <section className="mb-16 max-w-screen">
                    <h2 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-5">
                        Matches at Toronto's Own Stadium
                    </h2>
                    <p className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                        BMO Field is hosting FIFA World Cup matches beyond Canada's opener. Toronto is an official host city, which means world-class football is being played in your backyard all tournament long. Silent H puts you minutes away from the stadium and the fan zone — the natural pregame and postgame destination for any match day in the city.
                    </p>
                </section>

                {/* Fan Zone Section */}
                <section className="mb-16 max-w-screen">
                    <h2 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-5">
                        FIFA Toronto Fan Zone — Silent H Is Right There
                    </h2>
                    <div className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] space-y-5">
                        <p>
                            Toronto's official FIFA fan zone is at Fort York and The Bentway — one of the most exciting activations this city has seen. Silent H on King West puts you minutes away. Hit the fan zone, then land at a proper table with a proper meal and keep the energy going all night.
                        </p>
                        <p>Pre-fan zone. Post-fan zone. Match day dining. It all works from 461 King St W.</p>
                    </div>
                </section>

                {/* What to Expect Section */}
                <section className="mb-16 max-w-screen">
                    <h2 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-5">
                        What to Expect: FIFA Viewing at Silent H
                    </h2>
                    <p className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] mb-8">
                        Silent H will be open and screening matches throughout the 2026 FIFA World Cup — group stage, knockout rounds, and everything through to the Final.
                    </p>

                    {/* Reservations */}
                    <div className="flex gap-[20px] items-center mb-8">
                        <img alt="Silent H interior" className="w-[366px] h-[205px] object-cover shrink-0" src={"./fifa11.png"} />
                        <div className="flex-1">
                            <h3 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-3">
                                Reservations
                            </h3>
                            <div className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                <p className="mb-3">
                                    Reservations are strongly recommended for all Canada and Mexico matches, as well as knockout stage games. Walk-in availability will be limited during high-demand fixtures.
                                </p>
                                <ul className="list-disc ml-8 space-y-1">
                                    <li>Arrive at least 30 minutes before kickoff</li>
                                    <li>Tables held until 15 minutes before kickoff, then released to walk-ins</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Private Dining */}
                    <div className="flex gap-[20px] items-center">
                        <img alt="Silent H private dining" className="w-[366px] h-[205px] object-cover shrink-0" src={"./fifa12.png"} />
                        <div className="flex-1">
                            <h3 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-3">
                                Private Dining
                            </h3>
                            <div className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                <p className="mb-3">Hosting a group? Silent H's private dining room is available for World Cup bookings:</p>
                                <ul className="list-disc ml-8 space-y-1">
                                    <li>Ideal for groups of 10–20 guests</li>
                                    <li>Your own server and dedicated experience</li>
                                    <li>Full kitchen access throughout the match</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* From Kickoff to Last Call */}
                <section className="mb-16 max-w-[946px]">
                    <h2 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-5">
                        From Kickoff to Last Call
                    </h2>
                    <div className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] space-y-5">
                        <p>At Silent H, the match is the anchor — not the whole story.</p>
                        <p>
                            Come early. Settle in over a mezcal negroni or a fresh round of guacamole. Watch the match with full sound in a room that actually cares about the result. Then stay — because King West during a World Cup summer is somewhere you want to be.
                        </p>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-[60px] max-w-screen">
                    <h2 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-5">
                                Where is the best place to watch FIFA World Cup 2026 in Toronto?
                            </h3>
                            <p className="font-['NeueBit',sans-serif] font-[400] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                Silent H on King West offers one of the most complete experiences in the city — elevated dining, a serious cocktail program, and full match coverage throughout the tournament. It's the ideal destination for fans of any nation.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-5">
                                Where can I watch Canada vs Bosnia at FIFA 2026 in Toronto?
                            </h3>
                            <p className="font-['NeueBit',sans-serif] font-[400] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                Canada opens on home soil at BMO Field on June 12. Silent H on King West is the ideal spot to watch with full sound, great food, and the right atmosphere — whether you're heading to the game or watching from the restaurant.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-5">
                                Where to watch El Tri in Toronto?
                            </h3>
                            <p className="font-['NeueBit',sans-serif] font-[400] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                Silent H. It's the only upscale Mexican restaurant in the King West area screening FIFA matches — and there is no better backdrop for watching Mexico play than a room built around Mexican culture and cuisine.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-5">
                                Do I need a reservation to watch FIFA at Silent H?
                            </h3>
                            <p className="font-['NeueBit',sans-serif] font-[400] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                Yes — reservations are strongly recommended, especially for Canada and Mexico matches and all knockout stage games. Walk-in space will be very limited on high-demand match days.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-5">
                                Does Silent H serve food during matches?
                            </h3>
                            <p className="font-['NeueBit',sans-serif] font-[400] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                Yes. The full kitchen is open throughout the tournament. This is proper dining alongside the football — not bar snacks.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-5">
                                Where is Silent H located?
                            </h3>
                            <p className="font-['NeueBit',sans-serif] font-[400] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                461 King St W, Toronto — in the heart of King West, minutes from BMO Field and the FIFA Toronto fan zone at Fort York and The Bentway.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-5">
                                When does Canada play at FIFA 2026?
                            </h3>
                            <p className="font-['NeueBit',sans-serif] font-[400] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                Canada plays June 12 (vs Bosnia & Herzegovina, Toronto), June 18 (vs Qatar, Vancouver), and June 24 (vs Switzerland, Vancouver).
                            </p>
                        </div>
                        <div>
                            <h3 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[1.54px] leading-[1.2] mb-5">
                                When does Mexico play at FIFA 2026?
                            </h3>
                            <p className="font-['NeueBit',sans-serif] font-[400] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2]">
                                Mexico plays June 11 (vs South Africa), June 18 (vs Korea Republic), and June 24 (vs Czechia). All group stage matches before knockout rounds begin June 28.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="mb-16 max-w-screen">
                    <h2 className="font-['Mondwest',sans-serif] font-[700] text-[#0b0b0b] text-[40px] tracking-[2.8px] leading-none mb-5">
                        Reserve Your Table
                    </h2>
                    <div className="font-['NeueBit',sans-serif] font-[700] text-[#0b0b0b] text-[22px] tracking-[2.2px] leading-[1.2] space-y-5 mb-10">
                        <p>
                            The FIFA World Cup comes around every four years. This one is on home soil — and Toronto is right in the middle of it. Whoever you're rooting for this summer, Silent H is where the match becomes a full experience.
                        </p>
                        <p>Book early. Tables for Canada and Mexico matches will go fast.</p>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={openReservationWidget}
                            className="btn font-['NeueBit'] font-bold mt-5 px-12 ml-20.5 md:ml-0 py-3 text-black
               text-[clamp(0.9rem,1.8vw,1.25rem)] bg-[#dfa867] transition-all duration-500 ease-in-out
               tracking-[0.2em] hover:bg-[#ECE1D4] hover:text-black transition active:bg-black active:text-[#EB4660] active:border-transparent"
                        >
                            RESERVE NOW
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer/>
        </div>
        </>
    );
}