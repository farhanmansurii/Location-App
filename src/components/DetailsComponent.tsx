import { RWebShare } from "react-web-share";
export default function DetailsComponent({ data }) {
  return (
    <div className="details">
      <h2 style={{ fontSize: '20px', textAlign: "left", fontWeight: 'lighter' }}>{data.display_name}</h2>
      {
        data.population &&
        <div className="population" style={{
          margin: '10px', gap: '3px'
          , paddingInline: '14px', paddingTop: '7px', paddingBottom: '7px', borderRadius: '30px'
        }}>
          Population : {data.population}
          {data.population_year &&
            <span>{"  "} as per year {data.population_year}</span>
          }
        </div>
      }
      <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: "https://on.natgeo.com/2zHaNup",
          title: "Flamingos",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button style={{ background: "#7ca982", border: '0px', width: 'fit-content', padding: '0.5rem', marginLeft: '1rem', borderRadius: '4rem' }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
        </button>
      </RWebShare>
    </div>
  )
}
