package handler

import (
	"errors"
	"freelancer/college-app/go/api/presenter"
	"freelancer/college-app/go/entity"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

type AdviceService interface {
	GetAdvices(userID string, adviceFilters entity.AdviceFilters) ([]entity.Advice, *int, error)
	GetAdviceByID(userID, adviceID string) (*entity.Advice, error)
	CreateAdvice(newAdvice entity.AdvicePayload) error
	UpdateAdvice(userID, adviceID string, newAdvice entity.UpdateAdvicePayload) error
	DeleteAdvice(userID, adviceID string) error
	UpdateAdviceStudentsNumber(userID, adviceID string) error
}

type AdviceController struct {
	AdviceService AdviceService
	AuthService   func(http.Handler) http.Handler
}

func NewAdviceController(adviceService AdviceService, authService func(http.Handler) http.Handler) *AdviceController {
	return &AdviceController{
		AdviceService: adviceService,
		AuthService:   authService,
	}
}

func (c *AdviceController) Routes() chi.Router {
	r := chi.NewRouter()
	r.Use(c.AuthService)
	r.Get("/", c.List)
	r.Post("/", c.Create)
	r.Get("/{id}", c.Show)
	r.Patch("/{id}", c.Update)
	r.Delete("/{id}", c.Delete)
	r.Patch("/{id}/students-number", c.UpdateAdviceStudentsNumber)
	return r
}

// @tags advices
// @summary List advices.
// @description List advices.
// @security BearerJWT
// @id list-advices
// @produce json
// @success 200 {object} presenter.AdviceList
// @param will_attend path string false "User ID that will attend to the advice."
// @param will_teach path string false "User ID that will teach the advice."
// @router /advices [get]
func (c *AdviceController) List(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}

	adviceDate := time.Now().In(time.Local)
	adviceFilters := entity.AdviceFilters{
		AdviceDate:     &adviceDate,
		UserWillAttend: r.URL.Query().Get("will_attend"),
		UserWillTeach:  r.URL.Query().Get("will_teach"),
	}

	list, total, err := c.AdviceService.GetAdvices(userID, adviceFilters)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	res := presenter.AdviceList{
		Total:   *total,
		Advices: make([]presenter.AdviceResponse, 0, len(list)),
	}

	for _, advice := range list {
		res.Advices = append(res.Advices, presenter.ToAdvicePresenter(advice))
	}

	render.Status(r, http.StatusOK)
	render.Render(w, r, &res)
}

// @tags advices
// @summary Show advice.
// @description Get advice given its ID.
// @security BearerJWT
// @id get-advice-by-id
// @produce json
// @success 200 {object} presenter.AdviceResponse
// @param id path string true "Advice ID."
// @router /advices/{id} [get]
func (c *AdviceController) Show(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}
	adviceID := chi.URLParam(r, "id")

	advice, err := c.AdviceService.GetAdviceByID(userID, adviceID)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	response := presenter.ToAdvicePresenter(*advice)
	render.Status(r, http.StatusOK)
	render.Render(w, r, &response)
}

// @tags advices
// @summary Create advice.
// @description Create advice.
// @security BearerJWT
// @id create-advice
// @success 201
// @param payload body presenter.AdvicePayload true "Advice that wants to be stored."
// @produce json
// @router /advices [post]
func (c *AdviceController) Create(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}

	var data presenter.AdvicePayload
	if err := render.Bind(r, &data); err != nil {
		CheckError(err, w, r)
		return
	}

	adviceDate, err := time.ParseInLocation("2006-01-02 15:04", data.AdviceDate, time.Local)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	newAdvice := entity.AdvicePayload{
		UserID:             userID,
		Subject:            data.Subject,
		AdviceDate:         adviceDate,
		ClassroomID:        data.ClassroomID,
		StudentsWillAttend: []string{userID},
		Status:             entity.ActiveStatus,
		CreationDate:       time.Now().In(time.Local),
	}

	err = c.AdviceService.CreateAdvice(newAdvice)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// @tags advices
// @summary Update advice.
// @description Update advice given its ID.
// @security BearerJWT
// @id update-advice
// @success 200
// @param id path string true "Advice ID."
// @param updatePayload body presenter.UpdateAdvicePayload true "Advice information that wants to be updated."
// @router /advices/{id} [patch]
func (c *AdviceController) Update(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}
	adviceID := chi.URLParam(r, "id")

	var data presenter.UpdateAdvicePayload
	if err := render.Bind(r, &data); err != nil {
		CheckError(err, w, r)
		return
	}

	adviceDate, err := time.ParseInLocation("2006-01-02 15:04", data.AdviceDate, time.Local)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	newAdvice := entity.UpdateAdvicePayload{
		Subject:     data.Subject,
		AdviceDate:  adviceDate,
		ClassroomID: data.ClassroomID,
	}

	err = c.AdviceService.UpdateAdvice(userID, adviceID, newAdvice)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// @tags advices
// @summary Delete advice.
// @description Delete advice given its ID.
// @security BearerJWT
// @id delete-advice
// @success 200
// @param id path string true "Advice ID."
// @router /advices/{id} [delete]
func (c *AdviceController) Delete(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}
	adviceID := chi.URLParam(r, "id")

	err := c.AdviceService.DeleteAdvice(userID, adviceID)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// @tags advices
// @summary Update advice students number.
// @description Update the number of students who will attend the advice.
// @security BearerJWT
// @id update-advice-students-number
// @success 200
// @param id path string true "Advice ID."
// @router /advices/{id}/students-number [patch]
func (c *AdviceController) UpdateAdviceStudentsNumber(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}
	adviceID := chi.URLParam(r, "id")

	err := c.AdviceService.UpdateAdviceStudentsNumber(userID, adviceID)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	w.WriteHeader(http.StatusOK)
}
