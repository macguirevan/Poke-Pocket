import Layout from "../../layout/Layout";
import './TermsOfService.css';

export default function TermsOfService() {
  return (
    <Layout>
      <div className="termsContainer">
        <h1 className="termsTitle">Terms of Service</h1>

        <section className="termsSection">
          <h2 className="termsSubtitle">Educational Purpose Disclaimer</h2>
          <p>
            This website and its associated content are intended solely for <strong>educational and non-commercial purposes</strong>. 
            The platform was developed as a learning project to explore concepts in web development, design, and user interaction.
          </p>
          <p>
            We acknowledge that certain images, names, and design elements featured on this website are the intellectual property 
            of <strong>The Pokémon Company</strong>, <strong>Nintendo</strong>, <strong>Creatures Inc.</strong>, and <strong>GAME FREAK Inc.</strong>, 
            specifically from the <em>Pokémon Trading Card Game (TCG)</em> and the <em>Pokémon TCG Pocket</em> mobile app. 
            These assets are used strictly for illustrative and educational demonstration.
          </p>
          <p>
            We do <strong>not</strong> claim ownership of any copyrighted materials 
            or assets from the Pokémon franchise. All rights and trademarks belong to their respective owners. This 
            website does <strong>not</strong> generate revenue, accept payments, or offer any form of paid service.
          </p>
          <p>
            If you are a representative of The Pokémon Company or another rights holder and believe any material on this site 
            is being used inappropriately, please contact us directly so we can address your concerns promptly.
          </p>
        </section>

        <section className="termsSection">
          <h2 className="termsSubtitle">User Acknowledgement</h2>
          <ul>
            <li>The content is presented in the spirit of academic and personal learning.</li>
            <li>You will not redistribute or repurpose any copyrighted materials found on the site for commercial use.</li>
            <li>This is an unofficial, fan-created educational project with no affiliation or endorsement from The Pokémon Company or related entities.</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
