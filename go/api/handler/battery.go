package handler

import (
	"errors"
	"net/http"
	"time"

	"freelancer/college-app/go/api/presenter"
	"freelancer/college-app/go/entity"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

type BatteryService interface {
	CreateBattery(newBattery entity.BatteryPayload) error
}

type BatteryController struct {
	BatteryService BatteryService
	AuthService    func(http.Handler) http.Handler
}

func NewBatteryController(batteryService BatteryService, authService func(http.Handler) http.Handler) *BatteryController {
	return &BatteryController{
		BatteryService: batteryService,
		AuthService:    authService,
	}
}

func (c *BatteryController) Routes() chi.Router {
	r := chi.NewRouter()
	r.Use(c.AuthService)
	r.Post("/", c.Create)
	return r
}

// @tags batteries
// @summary Create battery.
// @description Create battery.
// @security BearerJWT
// @param payload body presenter.BatteryPayload true "Battery info that wants to be stored."
// @id create-battery
// @success 201
// @router /batteries [post]
func (c *BatteryController) Create(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(ContextKeyUserID).(string)
	if !ok {
		err := errors.New("user not in context")
		CheckError(err, w, r)
		return
	}

	var data presenter.BatteryPayload
	if err := render.Bind(r, &data); err != nil {
		CheckError(err, w, r)
		return
	}

	newBattery := entity.BatteryPayload{
		UserID:       userID,
		BatteryLevel: data.BatteryLevel,
		LowPowerMode: data.LowPowerMode,
		BatteryState: data.BatteryState,
		CreationDate: time.Now().In(time.Local),
	}

	err := c.BatteryService.CreateBattery(newBattery)
	if err != nil {
		CheckError(err, w, r)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
