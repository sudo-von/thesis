package presenter

import (
	"errors"
	"freelancer/college-app/go/entity"
	"net/http"
	"strings"
)

var (
	ErrContactNotFound          = "CONTACT_NOT_FOUND"
	ErrContactAlreadyRegistered = "CONTACT_ALREADY_REGISTERED"
	ErrInvContactNumber         = "INVALID_CONTACT_NUMBER"
)

type ContactResponse struct {
	ID            string `json:"id" example:"613aab578a6ef50007e622be"`
	UserID        string `json:"user_id" example:"613aab578a6ef50007e622bd"`
	ContactName   string `json:"contact_name" example:"VoN"`
	ContactNumber string `json:"contact_number" example:"528661234567"`
	Message       string `json:"message" example:"Hi, i need..."`
}

func (ur *ContactResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

func ToContactPresenter(contact entity.Contact) ContactResponse {
	return ContactResponse{
		ID:            contact.ID,
		UserID:        contact.UserID,
		ContactName:   contact.ContactName,
		ContactNumber: contact.ContactNumber,
		Message:       contact.Message,
	}
}

type ContactPayload struct {
	ContactName   string `json:"contact_name" example:"VoN"`
	ContactNumber string `json:"contact_number" example:"528661234567"`
	Message       string `json:"message" example:"Hi, i need..."`
}

func (cp *ContactPayload) validate() (err error) {
	if len(strings.TrimSpace(cp.ContactName)) == 0 {
		err = mergeErrors(err, errors.New("missing field contact_name"))
	}
	if len(strings.TrimSpace(cp.ContactNumber)) == 0 {
		err = mergeErrors(err, errors.New("missing field contact_number"))
	}
	if len(strings.TrimSpace(cp.Message)) == 0 {
		err = mergeErrors(err, errors.New("missing field message"))
	}
	return
}

func (cp *ContactPayload) Bind(r *http.Request) error {
	if err := cp.validate(); err != nil {
		return err
	}
	return nil
}

type UpdateContactPayload struct {
	ContactName   string `json:"contact_name" example:"VoN"`
	ContactNumber string `json:"contact_number" example:"528661234567"`
	Message       string `json:"message" example:"Hi, i need..."`
}

func (ucp *UpdateContactPayload) validate() (err error) {
	if len(strings.TrimSpace(ucp.ContactName)) == 0 {
		err = mergeErrors(err, errors.New("missing field contact_name"))
	}
	if len(strings.TrimSpace(ucp.ContactNumber)) == 0 {
		err = mergeErrors(err, errors.New("missing field contact_number"))
	}
	if len(strings.TrimSpace(ucp.Message)) == 0 {
		err = mergeErrors(err, errors.New("missing field message"))
	}
	return
}

func (ucp *UpdateContactPayload) Bind(r *http.Request) error {
	if err := ucp.validate(); err != nil {
		return err
	}
	return nil
}
