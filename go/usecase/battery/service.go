package battery

import (
	"freelancer/college-app/go/api/presenter"
	"freelancer/college-app/go/entity"
	"freelancer/college-app/go/usecase/user"
)

type Service struct {
	batteryRepository BatteryRepository
	userRepository    UserRepository
}

func NewService(batteryRepository BatteryRepository, userRepository user.UserRepository) *Service {
	return &Service{
		batteryRepository,
		userRepository,
	}
}
func (s Service) CreateBattery(newBattery entity.BatteryPayload) error {

	_, err := s.userRepository.GetUserByID(newBattery.UserID)
	if err != nil {
		return entity.NewErrorInternalServer(err, presenter.ErrIntServError)
	}

	err = s.batteryRepository.CreateBattery(newBattery)
	if err != nil {
		return entity.NewErrorInternalServer(err, presenter.ErrIntServError)
	}
	return nil
}
