import PropTypes from 'prop-types';
import { Component } from 'react';
import { changeInputs } from '../services/ChangeFuntions';
import styles from './RatingSection.module.css';
import { clickBtnSubmitAvaliation,
  clickRatingButtons, removeComment } from '../services/ClickFunctions';

class RatingSection extends Component {
  state = {
    text: '',
    email: '',
    rating: 0,
  };

  changeInputs = changeInputs.bind(this);

  clickRatingButtons = clickRatingButtons.bind(this);

  clickBtnSubmitAvaliation = clickBtnSubmitAvaliation.bind(this);

  removeComment = removeComment.bind(this);

  render() {
    const { email, text, rating } = this.state;
    const { id } = this.props;
    const ratingsNumbers = ['1', '2', '3', '4', '5'];
    const ratings = JSON.parse(localStorage.getItem(id));
    return (
      <section className={ styles.ratings_product }>

        <section className={ styles.ratings_section }>
          <h2>Opiniões do Produto</h2>
          { ratings && ratings.length > 0 ? ratings.map((el, index) => (
            <div key={ index } className={ styles.rating_comment }>
              <button
                className={ styles.button_remove_comment }
                type="button"
                onClick={ () => this.removeComment(id, el.idComment) }
              >
                <i className="bi bi-trash" />
              </button>

              <div className={ styles.rating_stars_comment }>
                {ratingsNumbers.map((number) => (Number(number) <= Number(el.rating)
                  ? (
                    <i
                      key={ number }
                      className={ `bi bi-star-fill ${styles.star_comment}` }
                    />)
                  : (
                    <i
                      key={ number }
                      className={ `bi bi-star ${styles.star_comment}` }
                    />)))}
              </div>
              <p className={ styles.comment }>{el.text}</p>
              <p className={ styles.email }>{el.email}</p>
            </div>
          )) : (
            <p
              className={ styles.not_comment }
            >
              Ninguém comentou ainda, seja a primeira pessoa a avaliar o produto!
            </p>
          ) }
        </section>
        <form className={ styles.rating_form }>
          <h2>Avalie esse Produto</h2>
          <input
            type="email"
            name="email"
            placeholder="Insira seu Melhor E-mail"
            className={ styles.email_input }
            onChange={ this.changeInputs }
            value={ email }
          />
          <textarea
            required
            name="text"
            placeholder="Descreva sua Avaliação do Produto"
            className={ styles.textarea_input }
            onChange={ this.changeInputs }
            value={ text }
          />
          <div className={ styles.rating_stars }>
            {ratingsNumbers.map((number) => (
              <button
                key={ number }
                className={ styles.button_rating }
                type="button"
                onClick={ () => this.clickRatingButtons(number) }
              >
                {Number(number) <= rating
                  ? (<i className={ `bi bi-star-fill ${styles.star}` } />)
                  : (<i className={ `bi bi-star ${styles.star}` } />)}
              </button>
            ))}

          </div>
          <button
            type="button"
            className={ styles.submit_rating_button }
            onClick={ () => this.clickBtnSubmitAvaliation(id) }
          >
            Enviar
          </button>
        </form>
      </section>
    );
  }
}

RatingSection.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RatingSection;
