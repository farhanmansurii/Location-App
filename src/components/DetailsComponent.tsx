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
        <button style={{ background: "#7ca982", border: '0px', width: 'fit-content', padding: '0.5rem', marginLeft: '1rem', borderRadius: '4rem' }}>Share 🔗</button>
      </RWebShare>
    </div>
  )
}
