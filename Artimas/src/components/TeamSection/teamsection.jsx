import "./Cards.css";

const Card = ({ image, title, subtitle, socialLinks }) => {
  return (
    <div className="cards">
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <div className="content">
        <div className="details">
          <h2>
            {title} <br />
            <span>{subtitle}</span>
          </h2>
          <ul className="social_icons">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <i className={link.icon}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CardsContainer = () => {
  const cardsData = [
    {
      image: "images.jpg",
      title: "My Nature",
      subtitle: "Best Source",
      socialLinks: [
        { url: "#", icon: "fa fa-instagram" },
        { url: "#", icon: "fa fa-linkedin-square" },
        { url: "#", icon: "fa fa-github-alt" },
      ],
    },
    {
      image: "images.jpg",
      title: "My Nature",
      subtitle: "Best Source",
      socialLinks: [
        { url: "#", icon: "fa fa-instagram" },
        { url: "#", icon: "fa fa-linkedin-square" },
        { url: "#", icon: "fa fa-github-alt" },
      ],
    },
    {
      image: "images.jpg",
      title: "My Nature",
      subtitle: "Best Source",
      socialLinks: [
        { url: "#", icon: "fa fa-instagram" },
        { url: "#", icon: "fa fa-linkedin-square" },
        { url: "#", icon: "fa fa-github-alt" },
      ],
    },
  ];

  return (
    <div className="container">
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default CardsContainer;
