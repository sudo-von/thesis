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

type DepartmentService interface {
	GetDepartmentByID(userID, departmentID string) (*entity.Department, error)
	GetDepartments(userID string, departmentFilters entity.DepartmentFilters) ([]entity.Department, *int, error)
	CreateDepartment(userID string, departmentPayload entity.DepartmentPayload) error
	UpdateDepartment(userID, departmentID string, departmentPayload entity.UpdateDepartmentPayload) error
	DeleteDepartment(userID, departmentID string) error
}

type DepartmentController struct {
	DepartmentService DepartmentService
	AuthService       func(http.Handler) http.Handler
}

func NewDepartmentController(departmentService DepartmentService, authService func(http.Handler) http.Handler) *DepartmentController {
	return &DepartmentController{
		DepartmentService: departmentService,
		AuthService:       authService,
	}
}

func (c *DepartmentController) Routes() chi.Router {
	r := chi.NewRouter()
	r.Use(c.AuthService)
	r.Get("/{id}", c.Show)
	r.Get("/", c.List)
	r.Post("/", c.Create)
	r.Patch("/{id}", c.Update)
	r.Delete("/{id}", c.Delete)
	return r
}

// @tags departments
// @summary List departments.
// @description List departments.
// @security BearerJWT
// @id list-departments
// @produce json
// @success 200 {object} presenter.DepartmentList
// @router /departments [get]
func (c *DepartmentController) List(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}

	departmentFilters := entity.DepartmentFilters{}

	list, total, err := c.DepartmentService.GetDepartments(userID, departmentFilters)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	res := presenter.DepartmentList{
		Total:       *total,
		Departments: make([]presenter.DepartmentResponse, 0, len(list)),
	}

	for _, department := range list {
		res.Departments = append(res.Departments, presenter.ToDepartmentPresenter(department))
	}

	render.Status(r, http.StatusOK)
	render.Render(w, r, &res)
}

// @tags departments
// @summary Show department.
// @description Get department given its ID.
// @security BearerJWT
// @id get-department-by-id
// @produce json
// @success 200 {object} presenter.DepartmentResponse
// @param id path string true "Department ID."
// @router /departments/{id} [get]
func (c *DepartmentController) Show(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}
	departmentID := chi.URLParam(r, "id")

	department, err := c.DepartmentService.GetDepartmentByID(userID, departmentID)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	response := presenter.ToDepartmentPresenter(*department)
	render.Status(r, http.StatusOK)
	render.Render(w, r, &response)
}

// @tags departments
// @summary Create department.
// @description Create department.
// @security BearerJWT
// @param payload body presenter.DepartmentPayload true "Department that wants to be stored."
// @id create-department
// @success 201
// @router /departments [post]
func (c *DepartmentController) Create(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}

	var data presenter.DepartmentPayload
	if err := render.Bind(r, &data); err != nil {
		CheckError(err, w, r)
		return
	}

	newDepartment := entity.DepartmentPayload{
		UserID:       userID,
		Description:  data.Description,
		Street:       data.Street,
		Neighborhood: data.Neighborhood,
		Cost:         data.Cost,
		Status:       entity.ActiveStatus,
		Available:    true,
		CreationDate: time.Now().In(time.Local),
	}

	err := c.DepartmentService.CreateDepartment(userID, newDepartment)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// @tags departments
// @summary Update department.
// @description Update department given its ID.
// @security BearerJWT
// @id update-department
// @success 200
// @param id path string true "Department ID."
// @param updatePayload body presenter.UpdateDepartmentPayload true "Department information that wants to be updated."
// @router /departments/{id} [patch]
func (c *DepartmentController) Update(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}
	departmentID := chi.URLParam(r, "id")

	var data presenter.UpdateDepartmentPayload
	if err := render.Bind(r, &data); err != nil {
		CheckError(err, w, r)
		return
	}

	departmentPayload := entity.UpdateDepartmentPayload{
		Description:  data.Description,
		Street:       data.Street,
		Neighborhood: data.Neighborhood,
		Cost:         data.Cost,
		Available:    data.Available,
	}

	err := c.DepartmentService.UpdateDepartment(userID, departmentID, departmentPayload)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// @tags departments
// @summary Delete department.
// @description Delete department given its ID.
// @security BearerJWT
// @id delete-department
// @success 200
// @param id path string true "Department ID."
// @router /departments/{id} [delete]
func (c *DepartmentController) Delete(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}
	departmentID := chi.URLParam(r, "id")

	err := c.DepartmentService.DeleteDepartment(userID, departmentID)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	w.WriteHeader(http.StatusOK)
}
