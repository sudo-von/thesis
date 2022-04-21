package user_mood

import (
	"freelancer/college-app/go/entity"
	"freelancer/college-app/go/usecase/user"
	"reflect"
	"testing"
	"time"
)

func TestService_GetUserMoodByUserID(t *testing.T) {
	type fields struct {
		userRepository     user.UserReaderMock
		userMoodRepository UserMoodRepositoryMock
	}
	type args struct {
		userID          string
		requestedUserID string
		userMoodFilters entity.UserMoodFilters
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    *entity.UserMood
		wantErr bool
	}{
		{
			name: "ok",
			args: args{
				userID:          "615c09f7309d7ded48c7a053",
				requestedUserID: "615c09f7309d7ded48c7a053",
				userMoodFilters: entity.UserMoodFilters{},
			},
			want: &entity.UserMood{
				ID:           "615cb8b7cc577570b57b48ea",
				UserID:       "615c09f7309d7ded48c7a053",
				Mood:         5,
				CreationDate: time.Date(2021, 01, 01, 0, 0, 0, 0, time.Local),
			},
		},
		{
			name: "insufficient permissions",
			args: args{
				userID:          "615c09f7309d7ded48c7a053",
				requestedUserID: "615c09f7309d7ded48c7a054",
				userMoodFilters: entity.UserMoodFilters{},
			},
			wantErr: true,
		},
		{
			name: "user mood not found",
			args: args{
				userID:          "615c09f7309d7ded48c7a054",
				requestedUserID: "615c09f7309d7ded48c7a054",
				userMoodFilters: entity.UserMoodFilters{},
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := Service{
				userRepository:     tt.fields.userRepository,
				userMoodRepository: tt.fields.userMoodRepository,
			}
			got, err := s.GetUserMoodByUserID(tt.args.userID, tt.args.requestedUserID, tt.args.userMoodFilters)
			if (err != nil) != tt.wantErr {
				t.Errorf("Service.GetUserMoodByUserID() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Service.GetUserMoodByUserID() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestService_CreateUserMood(t *testing.T) {
	type fields struct {
		userRepository     user.UserReaderMock
		userMoodRepository UserMoodRepositoryMock
	}
	type args struct {
		userID          string
		requestedUserID string
		newUserMood     entity.UserMoodPayload
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		{
			name: "ok",
			args: args{
				userID:          "615c09f7309d7ded48c7a054",
				requestedUserID: "615c09f7309d7ded48c7a054",
				newUserMood: entity.UserMoodPayload{
					UserID:       "615c09f7309d7ded48c7a054",
					Mood:         5,
					CreationDate: time.Date(2021, 01, 01, 0, 0, 0, 0, time.Local),
				},
			},
		},
		{
			name: "insufficient permissions",
			args: args{
				userID:          "615c09f7309d7ded48c7a053",
				requestedUserID: "615c09f7309d7ded48c7a054",
			},
			wantErr: true,
		},
		{
			name: "invalid mood",
			args: args{
				userID:          "615c09f7309d7ded48c7a054",
				requestedUserID: "615c09f7309d7ded48c7a054",
				newUserMood: entity.UserMoodPayload{
					UserID:       "615c09f7309d7ded48c7a054",
					Mood:         11,
					CreationDate: time.Date(2021, 01, 01, 0, 0, 0, 0, time.Local),
				},
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := Service{
				userRepository:     tt.fields.userRepository,
				userMoodRepository: tt.fields.userMoodRepository,
			}
			if err := s.CreateUserMood(tt.args.userID, tt.args.requestedUserID, tt.args.newUserMood); (err != nil) != tt.wantErr {
				t.Errorf("Service.CreateUserMood() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestNewService(t *testing.T) {
	type args struct {
		userRepository     user.UserReaderMock
		userMoodRepository UserMoodRepositoryMock
	}
	tests := []struct {
		name string
		args args
		want *Service
	}{
		{
			name: "ok",
			args: args{
				userRepository:     user.UserReaderMock{},
				userMoodRepository: UserMoodRepositoryMock{},
			},
			want: &Service{
				userRepository:     user.UserReaderMock{},
				userMoodRepository: UserMoodRepositoryMock{},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewService(tt.args.userRepository, tt.args.userMoodRepository); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewService() = %v, want %v", got, tt.want)
			}
		})
	}
}
